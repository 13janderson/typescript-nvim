import { RPCMessagePackConnection } from "./connection"
import type { NVIM_API_INFO } from "./nvim_types"

const rpcConn = new RPCMessagePackConnection('127.0.0.1', 7666)
const nvimApiInfo = (await rpcConn.RPC({
  type: 0,
  msgid: 0,
  method: "nvim_get_api_info",
  params: []
}))?.result[1]


const apiInfo = nvimApiInfo as NVIM_API_INFO
const functions = apiInfo.functions
const func = functions[0]
if (func) {
  console.log(func)
  for (const param of func.parameters){
    const paramType = param[0]
    const paramName = param[1]
    console.log(`${paramName}: ${paramType}`)
  }
}
