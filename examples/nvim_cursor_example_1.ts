import { RPCMessagePackConnection } from "@src/rpc"
import { NvimClient } from "@clients/Nvim_TypeScript_0.12"
import { sleep } from "bun"

const rpcConn = new RPCMessagePackConnection('127.0.0.1', 7666)
const client = new NvimClient(rpcConn)

/**
* Move the cursor around some random text within a buffer. Strange toy example but it shows off the performance
* of neovims RPC implementation.
*/


// Setup
const GRID_SIZE = 25
const bufnr = (await client.nvim_get_current_buf()).data

const rndString = () => {
  let bufline = ""
  while (bufline.length < GRID_SIZE) {
    bufline += Date.now()
  }
  const shuffled = bufline.split("").sort(() => Math.random() - 0.5);
  bufline = shuffled.join("")
  return bufline
}

const arr = Array.from({ length: GRID_SIZE }, () => rndString());

await client.nvim_buf_set_lines(bufnr, 0, GRID_SIZE, false, arr)
const random = () => {
  const rnd = Math.random()
  return Math.max(Math.floor(rnd * GRID_SIZE), 1)
}

// Move cursor around to random places in buffer
for (let i = 0; i < 100000; i++) {
  await client.nvim_win_set_cursor(0, [random(), random()])
  sleep(5)
}

// Lets cleanup after this mess
await client.nvim_buf_set_lines(bufnr, 0, GRID_SIZE, true, [])

rpcConn.Close()

