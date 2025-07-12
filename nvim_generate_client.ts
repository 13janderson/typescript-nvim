import { type NVIM_API_INFO, type NVIM_PRIMITIVE, type NVIM_RETURN_TYPES,  isNvimPrimitive, isNvimSpecial, type NVIM_SPECIAL, type NVIM_PARAM_TYPES } from "./nvim_types"
import { RPCMessagePackConnection } from "./connection"
import ts, { type TypeNode } from "typescript"
import { factory, createPrinter, createSourceFile, SyntaxKind, type Expression } from "typescript"

const NVIM_HOST = "127.0.0.1"
const NVIM_PORT = "7666"

// Connect to neovim process and make single RPC call to nvim_get_api_info
const rpcConn = new RPCMessagePackConnection(NVIM_HOST, Number.parseInt(NVIM_PORT))

// Use rpcConn to call nvim_get_api_info by RPC
const nvimApiInfo = (await rpcConn.RPC({
  type: 0,
  msgid: 0,
  method: "nvim_get_api_info",
  params: []
}))?.result[1]

const apiInfo = nvimApiInfo as NVIM_API_INFO
const functions = apiInfo.functions

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

// Allows us to type things as promises
const promiseIdentifier = factory.createIdentifier("Promise")
function promise(ofType: TypeNode): ts.TypeReferenceNode {
  return factory.createTypeReferenceNode(
    promiseIdentifier,
    [ofType]
  )
}


// Map NVIM_PRIMITIVE types to Keyword TypeNodes
function typeNodeFromNvimPrimitive(nvimPrimitive: NVIM_PRIMITIVE): ts.KeywordTypeNode {
  switch (nvimPrimitive) {
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
    case "Object":
      return factory.createKeywordTypeNode(SyntaxKind.ObjectKeyword)
    default:
      console.error(`Unexpected type ${nvimPrimitive}`)
      return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
  }
}

// Map all NVIM_SPECIAL types to KeywordTypeNodes of NumberKeyword
function typeNodeFromNvimSpecial(_: NVIM_SPECIAL): ts.KeywordTypeNode {
  return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
}

// Delegate to typeNodeFromNvimPrimitive and typeNodeFromNvimSpecial and then handle logic for
// remaining cases.
function typeNodeFromNvimType(nvimParamType: NVIM_PARAM_TYPES): ts.TypeNode | undefined {
  if (isNvimPrimitive(nvimParamType)) {
    return typeNodeFromNvimPrimitive(nvimParamType)
  } else if (isNvimSpecial(nvimParamType)) {
    return typeNodeFromNvimSpecial(nvimParamType)
  }

  var typeNode: TypeNode
  switch (nvimParamType) {
    case "Array":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
      break
    case "Array(Boolean)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword)
      break
    case "Array(Integer)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
      break
    case "Array(Float)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
      break
    case "Array(String)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.StringKeyword)
      break
    case "Array(Dict)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.ObjectKeyword)
      break
    case "Array(Object)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.ObjectKeyword)
      break
    case "Array(Buffer)":
      typeNode = factory.createTypeReferenceNode(NVIMBufferExtReturnImportIdentifier)
      break
    case "Array(Tabpage)":
      typeNode = factory.createTypeReferenceNode(NVIMTabpageExtReturnImportIdentifier)
      break
    case "Array(Window)":
      typeNode = factory.createTypeReferenceNode(NVIMWindowExtReturnImportIdentifier)
      break
    case "ArrayOf(Boolean)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword)
      break
    case "ArrayOf(Integer)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
      break
    case "ArrayOf(Float)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
      break
    case "ArrayOf(String)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.StringKeyword)
      break
    case "ArrayOf(Dict)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.ObjectKeyword)
      break
    case "ArrayOf(Object)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.ObjectKeyword)
      break
    case "ArrayOf(Buffer)":
      typeNode = factory.createTypeReferenceNode(NVIMBufferExtReturnImportIdentifier)
      break
    case "ArrayOf(Tabpage)":
      typeNode = factory.createTypeReferenceNode(NVIMWindowExtReturnImportIdentifier)
      break
    case "ArrayOf(Window)":
      typeNode = factory.createTypeReferenceNode(NVIMWindowExtReturnImportIdentifier)
      break
    case "ArrayOf(Integer, 2)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
      break
    case "LuaRef":
      console.error(`LuaRef's cannot cross the RPC boundary and thus we cannot map this param type.`)
      return
    default:
      return
  }
  return factory.createArrayTypeNode(typeNode)

}


// Map NVIM_SPECIAL types to their relevant special return types, typed from nvim docs.
function returnTypeNodeFromNvimSpecial(nvimSpecial: NVIM_SPECIAL): ts.TypeReferenceType {
  switch (nvimSpecial) {
    case "Buffer":
      return factory.createTypeReferenceNode(NVIMBufferExtReturnImportIdentifier)
    case "Tabpage":
      return factory.createTypeReferenceNode(NVIMTabpageExtReturnImportIdentifier)
    case "Window":
      return factory.createTypeReferenceNode(NVIMWindowExtReturnImportIdentifier)
  }
}

// Delegate to returnTypeNodeFromNvimSpecial and typeNodeFromNvimSpecial and then handle logic for
// NVIM_ARRAY_ALL types to map to TypeNodes from any NVIM type.
function returnTypeNodeFromNvimType(nvimType: NVIM_RETURN_TYPES): ts.TypeNode {
  if (isNvimPrimitive(nvimType)) {
    return typeNodeFromNvimPrimitive(nvimType)
  }

  if (isNvimSpecial(nvimType)) {
    return returnTypeNodeFromNvimSpecial(nvimType)
  }

  var typeNode: TypeNode
  switch (nvimType) {
    case "Array":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
      break
    case "Array(Boolean)":
      typeNode = typeNodeFromNvimPrimitive("Boolean")
      break
    case "Array(Integer)":
      typeNode = typeNodeFromNvimPrimitive("Integer")
      break
    case "Array(Float)":
      typeNode = typeNodeFromNvimPrimitive("Float")
      break
    case "Array(String)":
      typeNode = typeNodeFromNvimPrimitive("String")
      break
    case "Array(Dict)":
      typeNode = typeNodeFromNvimPrimitive("Dict")
      break
    case "Array(Buffer)":
      typeNode = returnTypeNodeFromNvimSpecial("Buffer")
      break
    case "Array(Tabpage)":
      typeNode = returnTypeNodeFromNvimSpecial("Tabpage")
      break
    case "Array(Window)":
      typeNode = returnTypeNodeFromNvimSpecial("Window")
      break
    case "Array(Object)":
      typeNode = typeNodeFromNvimPrimitive("Object")
      break
    case "ArrayOf(Boolean)":
      typeNode = typeNodeFromNvimPrimitive("Boolean")
      break
    case "ArrayOf(Integer)":
      typeNode = typeNodeFromNvimPrimitive("Integer")
      break
    case "ArrayOf(Float)":
      typeNode = typeNodeFromNvimPrimitive("Float")
      break
    case "ArrayOf(String)":
      typeNode = typeNodeFromNvimPrimitive("String")
      break
    case "ArrayOf(Dict)":
      typeNode = typeNodeFromNvimPrimitive("Dict")
      break
    case "ArrayOf(Buffer)":
      typeNode = returnTypeNodeFromNvimSpecial("Buffer")
      break
    case "ArrayOf(Tabpage)":
      typeNode = returnTypeNodeFromNvimSpecial("Tabpage")
      break
    case "ArrayOf(Window)":
      typeNode = returnTypeNodeFromNvimSpecial("Window")
      break
    case "ArrayOf(Object)":
      typeNode = typeNodeFromNvimPrimitive("Object")
      break
    case "void":
      return factory.createKeywordTypeNode(SyntaxKind.VoidKeyword)
    case "ArrayOf(Integer, 2)":
      typeNode = factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
      break
    default:
      console.error(`Unexpected return type ${nvimType}`)
      return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
  }
  return factory.createArrayTypeNode(typeNode)
}

// Identifiers
const RPCImportIdentifier = factory.createIdentifier("RPC")
const NVIMBufferExtReturnImportIdentifier = factory.createIdentifier("NVIM_BUFFER_EXT_RETURN")
const NVIMWindowExtReturnImportIdentifier = factory.createIdentifier("NVIM_WINDOW_EXT_RETURN")
const NVIMTabpageExtReturnImportIdentifier = factory.createIdentifier("NVIM_TABPAGE_EXT_RETURN")
const RPCIdentifier = factory.createIdentifier("rpc")
const RPCMethodIdentifier = factory.createIdentifier("RPC")
const msgidIdentifier = factory.createIdentifier("msgid")


// Import RPCMessagePackConnection
const rpcImportDecl = factory.createImportDeclaration(
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

// Import Neovim special return types 
const nvimTypesImportDecl = factory.createImportDeclaration(
  undefined,
  factory.createImportClause(
    false,
    undefined,
    factory.createNamedImports(
      [
        factory.createImportSpecifier(true, undefined, NVIMBufferExtReturnImportIdentifier),
        factory.createImportSpecifier(true, undefined, NVIMWindowExtReturnImportIdentifier),
        factory.createImportSpecifier(true, undefined, NVIMTabpageExtReturnImportIdentifier),
      ]
    )
  ),
  factory.createStringLiteral("./nvim_types"),
);


function classMethods(): ts.MethodDeclaration[] {
  // We want to not include any methods where we fail to derive the type of any parameters or the return type of the function
  const methodDeclarations: ts.MethodDeclaration[] = []
  for (const func of functions) {
    // Create async class methods which call our to rpc client
    // const classMethods = functions.map((func) => {
    const paramDeclarations: ts.ParameterDeclaration[] = []

    let paramTypesDervied = true
    for (const param of func.parameters) {
      const paramTypeNode = typeNodeFromNvimType(param[0])
      if (paramTypeNode) {
        paramDeclarations.push(
          factory.createParameterDeclaration(
            undefined,
            undefined,
            param[1],
            undefined,
            paramTypeNode
          ))
      }else{
        paramTypesDervied = false
      }
    }

    if (!paramTypesDervied){
      // Skip over this function completely
      console.error(`Skipping over ${func.name} because we failed to derive all of its parameter types.`)
      continue
    }

    methodDeclarations.push(
      factory.createMethodDeclaration(
        [factory.createModifier(SyntaxKind.AsyncKeyword)],
        undefined,
        func.name,
        undefined,
        undefined,
        paramDeclarations,
        func?.return_type ? promise(returnTypeNodeFromNvimType(func.return_type)) : undefined,
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
    )
  }
  return methodDeclarations
}


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
    classMethods(),
  ].flat(),
);



const printer = createPrinter();

const fileName = `Nvim_TypeScript_${apiInfo.version.major}.${apiInfo.version.minor}.ts`
await Bun.write(
  Bun.file(fileName),
  [
    printer.printNode(ts.EmitHint.Unspecified, rpcImportDecl, createSourceFile("", "", ts.ScriptTarget.Latest)),
    "\n",
    printer.printNode(ts.EmitHint.Unspecified, nvimTypesImportDecl, createSourceFile("", "", ts.ScriptTarget.Latest)),
    "\n",
    printer.printNode(ts.EmitHint.Unspecified, classDeclaration, createSourceFile("", "", ts.ScriptTarget.Latest))
  ]
);

rpcConn.Close()
