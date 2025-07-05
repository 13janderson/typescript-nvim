import { encodeMessagePackRequest, decodeMessagePackResponse } from "./message_pack"
import type { MessagePackRequest } from "./message_pack"
import * as net from 'net'

const client = net.createConnection(7666, '127.0.0.1')

const mpr: MessagePackRequest = {
  type: 0,
  msgid: 1,
  method: "nvim_get_api_info",
  params: []
}


var buf: Buffer
client.on('data', (data) => {
  if (buf) {
    buf = Buffer.concat([buf, data])
    console.log(buf)
  } else {
    buf = Buffer.from(data)
  }
  const decodedBuffer = decodeMessagePackResponse(buf)
  if (decodedBuffer){
    console.log(decodedBuffer)
  }
})

client.on('error', (err) => {
  console.log(`Error: ${err}`)
})

client.write(encodeMessagePackRequest(mpr))
