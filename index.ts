import { RPCMessagePackConnection } from "./connection"
import type { NVIM_API_INFO, NVIM_RETURN_TYPES } from "./nvim_types"
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


function methodReturnType(nvimReturnType: NVIM_RETURN_TYPES): ts.TypeNode {
  switch (nvimReturnType) {
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
    case "Array":
      return ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword))
    case "Buffer":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    case "Window":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    case "Tabpage":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    case "Array(Boolean)":
      return ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword))
    case "Array(Integer)":
      return ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword))
    case "Array(Float)":
      return ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword))
    case "Array(String)":
      return ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword))
    case "Array(Dict)":
      return ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.ObjectKeyword))
    case "Array(Array)":
      return ts.factory.createArrayTypeNode(ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)))
    case "Array(Buffer)":
      return ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword))
    case "Array(Window)":
      return ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword))
    case "Array(Tabpage)":
      return ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword))
    case "void":
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
    case "ArrayOf(Boolean)":
    case "ArrayOf(Integer)":
    case "ArrayOf(Float)":
    case "ArrayOf(String)":
    case "ArrayOf(Dict)":
    case "ArrayOf(Array)":
    case "ArrayOf(Buffer)":
    case "ArrayOf(Window)":
    case "ArrayOf(Tabpage)":
    default:
      console.log(`DEFAULT CASE: ${nvimReturnType}`)
      return ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
  }

  // This function is dogshit.
  // Can definitely make this 10x more elegant
  // Switch statement is not our friend here I don't think
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


