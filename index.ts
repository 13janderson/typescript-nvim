import { RPCMessagePackConnection } from "./connection"
import { logObject } from "./nvim_types"
import { NvimClient } from "./Nvim_TypeScript_0.12"

const rpcConn = new RPCMessagePackConnection('127.0.0.1', 7699)
const client = new NvimClient(rpcConn)

// await client.nvim_buf_set_lines(0, 0, -1, false, [
//   "Hello",
//   "From",
//   "TypeScript"
// ])

const bufnr = await client.nvim_get_current_buf()
console.log(bufnr)
console.log(typeof bufnr)
logObject(bufnr as object)

