import { encodeMessagePackRequest, decodeMessagePackResponse } from "./message_pack"
import type { MessagePackRequest } from "./message_pack"
import * as net from 'net'

// Creates a TCP socket to connect to 127.0.0.1:7666
const socket = new net.Socket()
socket.connect(7666, '127.0.0.1', () => {
  console.log('Connected')
  const msgPackRequest: MessagePackRequest = {
    type: 0,
    msgid: 0,
    method: 'nvim_buf_set_lines',
    params: [0, 0, -1, true, ["Line 1", "Line 2"]]
  }
  const msg = encodeMessagePackRequest(msgPackRequest)
  socket.write(msg)
})

socket.on('data', (data) => {
  const decoded = decodeMessagePackResponse(data)
  if (decoded) {
    console.log(`type: ${decoded.type}`)
    console.log(`msgid: ${decoded.msgid}`)
  }
})

socket.on('error', (err) => {
  console.log(`Error: ${err}`)
})

