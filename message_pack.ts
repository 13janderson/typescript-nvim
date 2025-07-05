import { encode, decode } from '@msgpack/msgpack';
import * as net from 'net'

export interface MessagePackRequest {
  type: 0,
  msgid: number,
  method: string,
  params: any[]
}

function encodeMessagePackRequest(req: MessagePackRequest): Uint8Array {
  return encode([req.type, req.msgid, req.method, req.params])
}

function decodeMessagePackResponse(res: Buffer | unknown): MessagePackResponse | undefined {
  try {
    if (Buffer.isBuffer(res)) {
      const decoded = decode(res)
      if (decoded && typeof decoded === "object") {
        const decodedObjectEntries = Object.values(decoded)
        if (decodedObjectEntries.length == 4) {
          return {
            type: 1,
            msgid: decodedObjectEntries[1],
            error: decodedObjectEntries[2],
            result: decodedObjectEntries[3]
          }
        }
      }
      return decoded as MessagePackResponse
    }
  } catch (err) {
    console.error(err)
    throw "Failed to decode response"
  }
}

export interface MessagePackResponse {
  type: 1,
  msgid: number,
  error: string | null | undefined,
  result: any
}


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


// let id = 0 
// setInterval( ()=> {
//   const msg = encode([0, +id, 'nvim_get_api_info', []]);
//   wstream.write(msg)
// }, 1000)

