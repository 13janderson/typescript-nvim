import { RPCMessagePackConnection } from "./connection"
import { NvimClient } from "./Nvim_TypeScript_0.12"

const rpcConn = new RPCMessagePackConnection('127.0.0.1', 7666)
const client = new NvimClient(rpcConn)
await client.nvim_buf_set_lines(0, 0, -1, false, [
  "Hello",
  "From",
  "TypeScript"
])
