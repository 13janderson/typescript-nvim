import { RPCMessagePackConnection } from "./connection"
import { type NVIM_API_INFO, type NVIM_RETURN, type NVIM_PRIMITIVE, isNvimPrimitive } from "./nvim_types"
import ts, { SyntaxKind, type DeclarationName, type ImportClause } from "typescript"

const rpcConn = new RPCMessagePackConnection('127.0.0.1', 7666)
const nvimApiInfo = (await rpcConn.RPC({
  type: 0,
  msgid: 0,
  method: "nvim_get_api_info",
  params: []
}))?.result[1]

const apiInfo = nvimApiInfo as NVIM_API_INFO
const functions = apiInfo.functions
const filt = functions.filter((func) => func.name == "nvim_get_keymap")
console.log(filt)

function typeNodeFromNvimPrimitiveType(nvimBasicType: NVIM_PRIMITIVE): ts.KeywordTypeNode {
  switch (nvimBasicType) {
    case "Boolean":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword)
    case "Integer":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    case "Float":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    case "String":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
    case "Dict":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.ObjectKeyword)
    case "Buffer":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    case "Window":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    case "Tabpage":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    case "Object":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.ObjectKeyword)
  }
}

// We want to handle the basic types elsewhere for clarity to for re-usability
function typeNodeFromNvimType(nvimType: NVIM_RETURN): ts.TypeNode {
  if (isNvimPrimitive(nvimType)) {
    return typeNodeFromNvimPrimitiveType(nvimType)
  }

  var keyWordTypeNode: ts.KeywordTypeNode
  switch (nvimType) {
    case "Array":
      keyWordTypeNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
      break
    case "Array(Boolean)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Boolean")
      break
    case "Array(Integer)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Integer")
      break
    case "Array(Float)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Float")
      break
    case "Array(String)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("String")
      break
    case "Array(Dict)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Dict")
      break
    case "Array(Buffer)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Buffer")
      break
    case "Array(Tabpage)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Tabpage")
      break
    case "Array(Window)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Window")
      break
    case "Array(Object)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Object")
      break
    case "ArrayOf(Boolean)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Boolean")
      break
    case "ArrayOf(Integer)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Integer")
      break
    case "ArrayOf(Float)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Float")
      break
    case "ArrayOf(String)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("String")
      break
    case "ArrayOf(Dict)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Dict")
      break
    case "ArrayOf(Buffer)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Buffer")
      break
    case "ArrayOf(Tabpage)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Tabpage")
      break
    case "ArrayOf(Window)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Window")
      break
    case "ArrayOf(Object)":
      keyWordTypeNode = typeNodeFromNvimPrimitiveType("Object")
      break
    case "void":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
    default:
      console.error(`Unexpected return type ${nvimType}`)
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
  }
  return ts.factory.createArrayTypeNode(keyWordTypeNode)
}

const RPCImportIdentifier = ts.factory.createIdentifier("RPC")
const RPCIdentifier = ts.factory.createIdentifier("rpc")
const importDecl = ts.factory.createImportDeclaration(
  undefined,
  ts.factory.createImportClause(
    false,
    undefined,
    ts.factory.createNamedImports(
      [
        ts.factory.createImportSpecifier(false, ts.factory.createIdentifier("RPCMessagePackConnection"), RPCImportIdentifier)
      ]
    )
  ),
  ts.factory.createStringLiteral("./connection"),
);


function tsChainedPropertyAccess(expr: ts.Expression, identifiers: (string | ts.MemberName)[]): ts.Expression {
  const id = identifiers.pop()
  if (!id){
    return expr
  }
  return (
    ts.factory.createPropertyAccessExpression(
      tsChainedPropertyAccess(expr, identifiers),
      id
    )
  )
}

const classMethods = functions.map((func) => {
  console.log(`Creating class method for ${func.name}`)
  return ts.factory.createMethodDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
    undefined,
    func.name,
    undefined,
    undefined,
    func.parameters.map((param) =>
      ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        param[1],
        undefined,
        typeNodeFromNvimType(param[0]),
        undefined
      )
    ),
    func?.return_type ? typeNodeFromNvimType(func.return_type) : undefined,
    ts.factory.createBlock([
      ts.factory.createReturnStatement(
        ts.factory.createCallExpression(
          tsChainedPropertyAccess(
            ts.factory.createThis(), [RPCIdentifier, func.name]
          ),
          undefined,
          undefined
        )
        // ts.factory.createPropertyAccessExpression()
      ),
    ], true),
  )
}
)



const className = `NvimClient`
const classDeclaration = ts.factory.createClassDeclaration(
  [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
  ts.factory.createIdentifier(className),
  undefined,
  undefined,
  [
    ts.factory.createConstructorDeclaration(undefined, [
      ts.factory.createParameterDeclaration(
        [
          ts.factory.createModifier(SyntaxKind.PrivateKeyword)
        ],
        undefined,
        RPCIdentifier,
        undefined,
        ts.factory.createTypeReferenceNode(RPCImportIdentifier), // Reference something else in the program, can be an identifier
        undefined
      )
    ], ts.factory.createBlock([], false)),
    classMethods
  ].flat(),
);


const printer = ts.createPrinter();

const fileName = `Nvim_TypeScript_${apiInfo.version.major}.${apiInfo.version.minor}.ts`
await Bun.write(
  Bun.file(fileName),
  [
    printer.printNode(ts.EmitHint.Unspecified, importDecl, ts.createSourceFile("", "", ts.ScriptTarget.Latest)),
    "\n",
    printer.printNode(ts.EmitHint.Unspecified, classDeclaration, ts.createSourceFile("", "", ts.ScriptTarget.Latest))
  ]
);


