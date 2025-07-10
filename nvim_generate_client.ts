import { type NVIM_API_INFO, type NVIM_PRIMITIVE, type NVIM_RETURN, type NVIM_ALL, isNvimPrimitive, logObject } from "./nvim_types"
import { RPCMessagePackConnection } from "./connection"
import ts, { type TypeNode } from "typescript"
import { factory, createPrinter, createSourceFile, SyntaxKind, type Expression } from "typescript"
import { spawn } from "bun"

// Spawn neovim process 
const NVIM_HOST = "127.0.0.1"
const NVIM_PORT = "7666"
// spawn(["nvim", "--headless", "--listen", NVIM_HOST, NVIM_PORT])

// Connect to neovim process and make single RPC call to nvim_get_api_info
const rpcConn = new RPCMessagePackConnection(NVIM_HOST, Number.parseInt(NVIM_PORT))
const nvimApiInfo = (await rpcConn.RPC({
  type: 0,
  msgid: 0,
  method: "nvim_get_api_info",
  params: []
}))?.result[1]

const apiInfo = nvimApiInfo as NVIM_API_INFO
logObject(apiInfo)
const functions = apiInfo.functions

function typeNodeFromNvimPrimitiveType(nvimBasicType: NVIM_PRIMITIVE): ts.KeywordTypeNode {
  switch (nvimBasicType) {
    case "Boolean":
      return factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword)
    case "Integer":
      return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
    case "Float":
      return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
    case "String":
      return factory.createKeywordTypeNode(SyntaxKind.StringKeyword)
    case "Dict":
      return factory.createKeywordTypeNode(SyntaxKind.ObjectKeyword)
    case "Buffer":
      return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
    case "Window":
      return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
    case "Tabpage":
      return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
    case "Object":
      return factory.createKeywordTypeNode(SyntaxKind.ObjectKeyword)
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
      keyWordTypeNode = factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
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
      return factory.createKeywordTypeNode(SyntaxKind.VoidKeyword)
    default:
      console.error(`Unexpected return type ${nvimType}`)
      return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
  }
  return factory.createArrayTypeNode(keyWordTypeNode)
}

const RPCImportIdentifier = factory.createIdentifier("RPC")
const RPCIdentifier = factory.createIdentifier("rpc")
const RPCMethodIdentifier = factory.createIdentifier("RPC")
const msgidIdentifier = factory.createIdentifier("msgid")
const importDecl = factory.createImportDeclaration(
  undefined,
  factory.createImportClause(
    false,
    undefined,
    factory.createNamedImports(
      [
        factory.createImportSpecifier(false, factory.createIdentifier("RPCMessagePackConnection"), RPCImportIdentifier)
      ]
    )
  ),
  factory.createStringLiteral("./connection"),
);


// Resolves to expr.[...identifiers]
// E.g. expr = factory.createThis(), identifiers = ["foo", "bar"]
//      generates expression for this.foo.bar
function chainedPropertyAccess(expr: Expression, identifiers: (string | ts.MemberName)[], questionMark: boolean = false): Expression {
  const id = identifiers.pop()
  if (!id) {
    return expr
  }
  return (
    factory.createPropertyAccessChain(
      chainedPropertyAccess(expr, identifiers),
      questionMark ? factory.createToken(SyntaxKind.QuestionDotToken) : undefined,
      id
    )
  )
}

function promise(ofType: TypeNode): ts.TypeReferenceNode {
  return factory.createTypeReferenceNode(
    factory.createIdentifier("Promise"),
    [ofType]
  )
}

const classMethods = functions.map((func) => {
  return factory.createMethodDeclaration(
    [factory.createModifier(SyntaxKind.AsyncKeyword)],
    undefined,
    func.name,
    undefined,
    undefined,
    func.parameters.map((param) =>
      factory.createParameterDeclaration(
        undefined,
        undefined,
        param[1],
        undefined,
        typeNodeFromNvimType(param[0]),
        undefined
      )
    ),
    func?.return_type ? promise(typeNodeFromNvimType(func.return_type)) : undefined,
    factory.createBlock([
      factory.createReturnStatement(
        chainedPropertyAccess(
          factory.createAwaitExpression(
            factory.createCallExpression(
              chainedPropertyAccess(
                factory.createThis(), [RPCIdentifier, RPCMethodIdentifier]
              ),
              undefined,
              [
                factory.createObjectLiteralExpression(
                  [
                    factory.createPropertyAssignment("type",
                      factory.createNumericLiteral(0),
                    ),
                    factory.createPropertyAssignment("msgid",
                      factory.createPostfixUnaryExpression(
                        chainedPropertyAccess(
                          factory.createThis(),
                          [msgidIdentifier],
                        ),
                        ts.SyntaxKind.PlusPlusToken,
                      )
                    ),
                    factory.createPropertyAssignment("method",
                      factory.createStringLiteral(func.name),
                    ),
                    factory.createPropertyAssignment("params",
                      factory.createArrayLiteralExpression(
                        func.parameters.map((param) => {
                          return factory.createIdentifier(param[1])
                        }),
                        false
                      )

                    ),
                  ]
                )
              ]
            )
          ),
          ["result"],
          true
        )
      ),
    ], true),
  )
}
)

const className = `NvimClient`
const classDeclaration = factory.createClassDeclaration(
  [factory.createModifier(SyntaxKind.ExportKeyword)],
  factory.createIdentifier(className),
  undefined,
  undefined,
  [
    factory.createConstructorDeclaration(undefined, [
      factory.createParameterDeclaration(
        [
          factory.createModifier(SyntaxKind.PrivateKeyword)
        ],
        undefined,
        RPCIdentifier,
        undefined,
        factory.createTypeReferenceNode(RPCImportIdentifier), // Reference something else in the program, can be an identifier
        undefined
      ),
      factory.createParameterDeclaration(
        [
          factory.createModifier(SyntaxKind.PrivateKeyword)
        ],
        undefined,
        msgidIdentifier,
        undefined,
        undefined,
        factory.createNumericLiteral(0)
      )
    ], factory.createBlock([], false)),
    classMethods
  ].flat(),
);



const printer = createPrinter();

const fileName = `Nvim_TypeScript_${apiInfo.version.major}.${apiInfo.version.minor}.ts`
await Bun.write(
  Bun.file(fileName),
  [
    printer.printNode(ts.EmitHint.Unspecified, importDecl, createSourceFile("", "", ts.ScriptTarget.Latest)),
    "\n",
    printer.printNode(ts.EmitHint.Unspecified, classDeclaration, createSourceFile("", "", ts.ScriptTarget.Latest))
  ]
);

