# ts-nvim

A TypeScript Neovim client which uses RPC to communicate with neovim. This project utilises Neovims built in RPC capability.

We generate TypeScript client(s) automatically by calling `nvim_get_api_info` over RPC, iterating over this response and using the TypeScript compiler API
  to generate a client as a single class.

Generated client(s) then use the the same RPC mechanism to provide all available neovim methods.

Return and parameter types are derived as per neovim's own documentation, see `help api-metadata` and `help api-types`.


# Installation

To install dependencies:

```bash
bun install
```

# Motivation
What is the point of this? If you can already communicate with a neovim instance via lua, then why would you need to do it in another lanauge via RPC.

My main motivation for this was from a previously failed project where I tried to make a game to learn vim's keybindings.
- It had a go backend which used [neovims go client](https://github.com/neovim/go-client) on the backend to communicate keypresses from a javascript frontend built in react.
- This project became hard to maintain and develop due to the having to communiate between two different langages... return types became fuzzy and I didn't want to have to dig into gRPC or something.
- But if we could have the frontend and the backend speak the same language and have explicit contracts defined for each endpoint then it would be a lot easier... hence I built this.
- Now, whether I actually go and use this now for a rebuild of that same project is another question but im confident that it would be damn sight easier to do if it were all in TypeScript.


# Examples

Full code examples are included in [examples](./examples).

Note these code samples rely on a neovim instance to be running and to be listening for conections on the same port that the RPC connection communicates to.
- i.e. `nvim --listen 127.0.0.1:{PORT}`

## 1. Create a buffer and set some lines
```typescript
import { RPCMessagePackConnection } from "@src/rpc"
import { NvimClient } from "@clients/Nvim_TypeScript_0.12"

const rpcConn = new RPCMessagePackConnection('127.0.0.1', 7666)
const client = new NvimClient(rpcConn)

const bufnr = (await client.nvim_create_buf(true, false)).data

if (bufnr) {
  await client.nvim_set_current_buf(bufnr)
  await client.nvim_buf_set_lines(bufnr, 0, -1, false, [
    "Hello",
    "From",
    bufnr!.toString()
  ])
}

rpcConn.Close()
```
- We create an RPC connection on localhost:7666, with a neovim instance running to listen on that same port: `nvim --listen 127.0.0.1:7666`.
- We then use one of the generated client for Neovim 0.12 and call nvim_create_buf.
- We then set its lines...

**For Anyone whose used Neovims API before, this should look extremely familiar... this is the exact idea behind this.**



