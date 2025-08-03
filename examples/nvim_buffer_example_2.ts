import { RPCMessagePackConnection } from "@src/rpc"
import { NvimClient } from "@clients/Nvim_TypeScript_0.12"

const rpcConn = new RPCMessagePackConnection('127.0.0.1', 7666)
const client = new NvimClient(rpcConn)

const bufnr = (await client.nvim_get_current_buf()).data
console.log(`bufnr:${bufnr}`)
const winnr = (await client.nvim_open_win(bufnr!, true, { relative: 'win', row: 0, col: 0, width: 10, height: 10 })).data
console.log(`winnr:${winnr}`)

// if (bufnr) {
//   await client.nvim_buf_set_lines(bufnr, 0, -1, false, [
//     "Hello",
//     "From",
//     "Example",
//     "2"
//   ])
// }

rpcConn.Close()

