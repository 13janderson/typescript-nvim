import { RPCMessagePackConnection } from "./connection"
import { NvimClient } from "./Nvim_TypeScript_0.12"

const rpcConn = new RPCMessagePackConnection('127.0.0.1', 7666)
const client = new NvimClient(rpcConn)

const bufnr = (await client.nvim_create_buf(true, false)).data[0]
if (bufnr) {
  await client.nvim_set_current_buf(bufnr)
  await client.nvim_buf_set_lines(bufnr!, 0, -1, false, [
    "Hello",
    "From",
    bufnr!.toString()
  ])
}

rpcConn.Close()

