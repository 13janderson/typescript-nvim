import { log } from "console"
import type { MessagePackRequest, MessagePackResponse } from "./message_pack"
import { encodeMessagePackRequest, decodeMessagePackResponse } from "./message_pack"
import { logObject } from "./nvim_types"
import * as net from 'net'


/*
* Warning 
* This class is not thread safe.
* That is, you SHOULD not make concurrent RPC calls using a single instance of this class
*/
export class RPCMessagePackConnection{
  private socket: net.Socket
  constructor(
    private hostname: string,
    private port: number,
    private rpcQueue: MessagePackRequest[] = [],
    private rpcPending = new Map<MessagePackRequest['msgid'], (res: any) => void>(),
    private rpcDataBuffer: Buffer | undefined = undefined
  ) {
    this.socket = net.createConnection(this.port, this.hostname)

    this.socket.on('data', (data) => {
      if (this.rpcDataBuffer) {
        this.rpcDataBuffer = Buffer.concat([this.rpcDataBuffer, data])
      } else {
        this.rpcDataBuffer = Buffer.from(data)
      }
      const decodedBuffer = decodeMessagePackResponse(this.rpcDataBuffer)
      if (decodedBuffer) {
        const msgid = decodedBuffer.msgid
        this.rpcDataBuffer = undefined
        const pendingPromise = this.rpcPending.get(msgid)
        this.rpcPending.delete(msgid)
        if (pendingPromise){
          pendingPromise(decodedBuffer)
        }

        // Cleanup: delete entry for this msgid
        // and if theres anything else on the queue, begin executing it.
        const rpcQueueHead = this.rpcQueue.pop()
        if (rpcQueueHead){
          console.log('Dequeuing operation from queue')
          this.socket.write(encodeMessagePackRequest(rpcQueueHead))
        }
      }
    })

    this.socket.on('error', (err) => {
      console.log(`Error: ${err}`)
    })

  }

  RPC(req: MessagePackRequest): Promise<MessagePackResponse | undefined> {
    logObject(req)
    return new Promise((resolve) => {
      if (this.rpcPending.size == 0)  {
        // No current RPC calls are awaiting data and so we can safely perform this call
        this.socket.write(encodeMessagePackRequest(req))
      }else{
        // Otherwise, queue this call up to be executed next.
        // Queueing avoids needing to worry about data chunks from different
        // RPC calls coming back in a different order.
        console.log('Enqueuing operation onto queue')
        this.rpcQueue.push(req)
      }
      this.rpcPending.set(req.msgid, resolve)
    })
  }
}
