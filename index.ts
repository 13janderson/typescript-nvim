import { RPCMessagePackConnection } from "./connection"
import { logObject } from "./nvim_types"
import { NvimClient } from "./Nvim_TypeScript_0.12"

const rpcConn = new RPCMessagePackConnection('127.0.0.1', 7666)
const client = new NvimClient(rpcConn)

const bufnr = (await client.nvim_create_buf(true, false)).data[0]
// console.log("Resolved")
// const current_bufnr = await client.nvim_get_current_buf()
// console.log(`current_bufnr:${current_bufnr.data}`)
// console.log("Resolved")

// await client.nvim_set_current_buf(bufnr!)

await client.nvim_buf_set_lines(bufnr!, 0, -1, false, [
  "Hello",
  "From",
  "NewBuffer"
])


// console.log(tabpage.Ext.data)
// const ext = bufnr.ExtData
// console.log(`ext:${ext}`)

// console.log(`data:${bufnr.data[1]}`)
// console.log(bufnr)
// logObject(bufnr)

