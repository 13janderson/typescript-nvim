import { CLIENTS } from "@/clients"
import { type NVIM_API_INFO } from "@src/nvim_types"
import { RPCMessagePackConnection } from "@src/rpc"
import path from "path"
import ts from "typescript"
import { factory, createPrinter, createSourceFile, SyntaxKind } from "typescript"
import * as identifiers from "./identifiers"
import { promise, returnTypeNodeFromNvimType, chainedPropertyAccess, typeNodeFromNvimType } from "./utils"

// Feel free to change these defaults
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

// Import RPCMessagePackConnection
const rpcImportDecl = factory.createImportDeclaration(
  undefined,
  factory.createImportClause(
    false,
    undefined,
    factory.createNamedImports(
      [
        factory.createImportSpecifier(false, factory.createIdentifier("RPCMessagePackConnection"), identifiers.RPCImportIdentifier)
      ]
    )
  ),
  factory.createStringLiteral("@src/rpc"),
);

// Import Neovim special return types 
const nvimTypesImportDecl = factory.createImportDeclaration(
  undefined,
  factory.createImportClause(
    false,
    undefined,
    factory.createNamedImports(
      [
        factory.createImportSpecifier(true, undefined, identifiers.NVIMBufferExtReturnImportIdentifier),
        factory.createImportSpecifier(true, undefined, identifiers.NVIMWindowExtReturnImportIdentifier),
        factory.createImportSpecifier(true, undefined, identifiers.NVIMTabpageExtReturnImportIdentifier),
      ]
    )
  ),
  factory.createStringLiteral("@src/nvim_types"),
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
      } else {
        paramTypesDervied = false
      }
    }

    if (!paramTypesDervied) {
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
        // TODO, handle not being able to derive this type
        func?.return_type ? promise(returnTypeNodeFromNvimType(func.return_type)) : undefined,
        factory.createBlock([
          factory.createReturnStatement(
            chainedPropertyAccess(
              factory.createAwaitExpression(
                factory.createCallExpression(
                  chainedPropertyAccess(
                    factory.createThis(), [identifiers.RPCIdentifier, identifiers.RPCMethodIdentifier]
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
                              [identifiers.msgidIdentifier],
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
              false
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
        identifiers.RPCIdentifier,
        undefined,
        factory.createTypeReferenceNode(identifiers.RPCImportIdentifier), // Reference something else in the program, can be an identifier
        undefined
      ),
      factory.createParameterDeclaration(
        [
          factory.createModifier(SyntaxKind.PrivateKeyword)
        ],
        undefined,
        identifiers.msgidIdentifier,
        undefined,
        undefined,
        factory.createNumericLiteral(0)
      )
    ], factory.createBlock([], false)),
    classMethods(),
  ].flat(),
);



const printer = createPrinter();

const fileName = path.join(CLIENTS, `Nvim_TypeScript_${apiInfo.version.major}.${apiInfo.version.minor}.ts`)
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

console.log(`Finishing generating client -> ${fileName}`)

  rpcConn.Close()
