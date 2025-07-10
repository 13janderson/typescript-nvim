import { RPCMessagePackConnection } from "./connection"
import { logObject } from "./nvim_types"
import { NvimClient } from "./Nvim_TypeScript_0.12"

const rpcConn = new RPCMessagePackConnection('127.0.0.1', 7666)
const client = new NvimClient(rpcConn)

// await client.nvim_buf_set_lines(0, 0, -1, false, [
//   "Hello",
//   "From",
//   "TypeScript"
// ])

const bufnr = await client.nvim_get_current_tabpage()
logObject(bufnr)
// const ext = bufnr.ExtData
// console.log(`ext:${ext}`)

// console.log(`data:${bufnr.data[1]}`)
// console.log(bufnr)
// logObject(bufnr)

