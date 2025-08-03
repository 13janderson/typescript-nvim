import { factory, SyntaxKind, type Expression } from "typescript"
import ts, { type TypeNode } from "typescript"
import { type NVIM_PRIMITIVE, type NVIM_RETURN_TYPES, isNvimPrimitive, isNvimSpecial, type NVIM_SPECIAL, type NVIM_PARAM_TYPES } from "@src/nvim_types"
import * as identifiers from "./identifiers"

// Resolves to expr.[...identifiers]
// E.g. expr = factory.createThis(), identifiers = ["foo", "bar"]
//      generates expression for this.foo.bar
export function chainedPropertyAccess(expr: Expression, identifiers: (string | ts.MemberName)[], questionMark: boolean = false): Expression {
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
export function promise(type: TypeNode): ts.TypeReferenceNode {
  return factory.createTypeReferenceNode(
    promiseIdentifier,
    [type]
  )
}


// Map NVIM_PRIMITIVE types to Keyword TypeNodes
export function typeNodeFromNvimPrimitive(nvimPrimitive: NVIM_PRIMITIVE): ts.KeywordTypeNode {
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
      return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
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
export function typeNodeFromNvimType(nvimParamType: NVIM_PARAM_TYPES): ts.TypeNode | undefined {
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
      typeNode = factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
      break
    case "Array(Buffer)":
      typeNode = factory.createTypeReferenceNode(identifiers.NVIMBufferExtReturnImportIdentifier)
      break
    case "Array(Tabpage)":
      typeNode = factory.createTypeReferenceNode(identifiers.NVIMTabpageExtReturnImportIdentifier)
      break
    case "Array(Window)":
      typeNode = factory.createTypeReferenceNode(identifiers.NVIMWindowExtReturnImportIdentifier)
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
      typeNode = factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
      break
    case "ArrayOf(Buffer)":
      typeNode = factory.createTypeReferenceNode(identifiers.NVIMBufferExtReturnImportIdentifier)
      break
    case "ArrayOf(Tabpage)":
      typeNode = factory.createTypeReferenceNode(identifiers.NVIMWindowExtReturnImportIdentifier)
      break
    case "ArrayOf(Window)":
      typeNode = factory.createTypeReferenceNode(identifiers.NVIMWindowExtReturnImportIdentifier)
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
export function returnTypeNodeFromNvimSpecial(nvimSpecial: NVIM_SPECIAL): ts.TypeReferenceType {
  switch (nvimSpecial) {
    case "Buffer":
      return factory.createTypeReferenceNode(identifiers.NVIMBufferExtReturnImportIdentifier)
    case "Tabpage":
      return factory.createTypeReferenceNode(identifiers.NVIMTabpageExtReturnImportIdentifier)
    case "Window":
      return factory.createTypeReferenceNode(identifiers.NVIMWindowExtReturnImportIdentifier)
  }
}

// Delegate to returnTypeNodeFromNvimSpecial and typeNodeFromNvimSpecial and then handle logic for
// NVIM_ARRAY_ALL types to map to TypeNodes from any NVIM type.
export function returnTypeNodeFromNvimType(nvimType: NVIM_RETURN_TYPES): ts.TypeNode {
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
