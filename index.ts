import { RPCMessagePackConnection } from "./connection"
import { type NVIM_API_INFO, type NVIM_RETURN, type NVIM_PRIMITIVE, isNvimPrimitive} from "./nvim_types"
import ts from "typescript"

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
// if (func) {
//   console.log(func)
//   for (const param of func.parameters) {
//     const paramType = param[0]
//     const paramName = param[1]
//     // TODO, translate this to javascript types.
//     // and then subsequently generate typescript methods
//     // with these type signatures.
//     // Is there a nice way to generate these at runtime?
//     // Or is there a nice codegen library for this? Having to write stringified typescript to a file is dogshit.
//
//     // TypeScript native way to create file with some contents.
//     console.log(`${paramName}: ${paramType}`)
//   }
// }


function primitiveMethodReturnType(nvimBasicType: NVIM_PRIMITIVE): ts.KeywordTypeNode {
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
function methodReturnType(nvimReturnType: NVIM_RETURN): ts.TypeNode {
  if (isNvimPrimitive(nvimReturnType)) {
    return primitiveMethodReturnType(nvimReturnType)
  }

  var keyWordTypeNode: ts.KeywordTypeNode
  switch (nvimReturnType) {
    case "Array":
      keyWordTypeNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
      break
    case "Array(Boolean)":
      keyWordTypeNode = primitiveMethodReturnType("Boolean")
      break
    case "Array(Integer)":
      keyWordTypeNode = primitiveMethodReturnType("Integer")
      break
    case "Array(Float)":
      keyWordTypeNode = primitiveMethodReturnType("Float")
      break
    case "Array(String)":
      keyWordTypeNode = primitiveMethodReturnType("String")
      break
    case "Array(Dict)":
      keyWordTypeNode = primitiveMethodReturnType("Dict")
      break
    case "Array(Buffer)":
      keyWordTypeNode = primitiveMethodReturnType("Buffer")
      break
    case "Array(Tabpage)":
      keyWordTypeNode = primitiveMethodReturnType("Tabpage")
      break
    case "Array(Window)":
      keyWordTypeNode = primitiveMethodReturnType("Window")
      break
    case "Array(Object)":
      keyWordTypeNode = primitiveMethodReturnType("Object")
      break
    case "ArrayOf(Boolean)":
      keyWordTypeNode = primitiveMethodReturnType("Boolean")
      break
    case "ArrayOf(Integer)":
      keyWordTypeNode = primitiveMethodReturnType("Integer")
      break
    case "ArrayOf(Float)":
      keyWordTypeNode = primitiveMethodReturnType("Float")
      break
    case "ArrayOf(String)":
      keyWordTypeNode = primitiveMethodReturnType("String")
      break
    case "ArrayOf(Dict)":
      keyWordTypeNode = primitiveMethodReturnType("Dict")
      break
    case "ArrayOf(Buffer)":
      keyWordTypeNode = primitiveMethodReturnType("Buffer")
      break
    case "ArrayOf(Tabpage)":
      keyWordTypeNode = primitiveMethodReturnType("Tabpage")
      break
    case "ArrayOf(Window)":
      keyWordTypeNode = primitiveMethodReturnType("Window")
      break
    case "ArrayOf(Object)":
      keyWordTypeNode = primitiveMethodReturnType("Object")
      break
    case "void":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
    default: 
      console.error(`Unexpected return type ${nvimReturnType}`)
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
  }

  return ts.factory.createArrayTypeNode(keyWordTypeNode)
}

const classMethods = functions.map((func) => {
  console.log(`Creating class method for ${func.name}`)
  return ts.factory.createMethodDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
    undefined,
    func.name,
    undefined,
    undefined,
    [], // parameters
    func?.return_type ? methodReturnType(func.return_type) : undefined,
    ts.factory.createBlock([
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
    ts.factory.createConstructorDeclaration(undefined, [], undefined),
    classMethods
  ].flat(),
);

// console.log(
//   printer.printNode(ts.EmitHint.Unspecified, classDeclaration, ts.createSourceFile("", "", ts.ScriptTarget.Latest))
// )


const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

const fileName = `Nvim_TypeScript_${apiInfo.version.major}.${apiInfo.version.minor}.ts`
await Bun.write(
  Bun.file(fileName),
  printer.printNode(ts.EmitHint.Unspecified, classDeclaration, ts.createSourceFile("", "", ts.ScriptTarget.Latest))
);


