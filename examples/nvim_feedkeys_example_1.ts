import { RPCMessagePackConnection } from "@src/rpc"
import { NvimClient } from "@clients/Nvim_TypeScript_0.12"

const rpcConn = new RPCMessagePackConnection('127.0.0.1', 7666)
const client = new NvimClient(rpcConn)

await client.nvim_buf_set_lines(0, 0, -1, true, ["Line1", "Line2", "Line3", "Line4"])

await client.nvim_feedkeys("2dj", "n", false)

rpcConn.Close()

