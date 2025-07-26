import type { MessagePackRequest, MessagePackResponse } from "./message_pack"
import { encodeMessagePackRequest, decodeMessagePackResponse } from "./message_pack"
import * as net from 'net'

export class RPCError extends Error {
  constructor(message?: string, err?: Error) {
    // Call the parent Error constructor with the message
    super(message);

    this.name = "RPCError";

    if (err) {
      this.message = err.message || message || "";
      this.stack = err.stack || this.stack;
    }

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, RPCError.prototype);
  }
}

type RPCPendingRequest = {
  msgpack: MessagePackRequest,
  resolve: (res: any) => void,
  reject: (reason: any) => void
}

/*
* Warning 
* This class is not thread safe.
* That is, you SHOULD not make concurrent RPC calls using a single instance of this class
*/
export class RPCMessagePackConnection {
  private socket: net.Socket
  constructor(
    private hostname: string,
    private port: number,
    private rpcQueue: MessagePackRequest[] = [],
    private rpcPending: RPCPendingRequest = {} as RPCPendingRequest, // Empty object is falsy
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
        const error = decodedBuffer.error
        if (error) {
          throw new RPCError(error)
        }

        const msgid = decodedBuffer.msgid
        this.rpcDataBuffer = undefined
        const expectedMsgId = this.rpcPending.msgpack.msgid
        if (expectedMsgId == msgid) {
          this.rpcPending.resolve(decodedBuffer)
        } else {
          this.Close() // I think we close at this point, you are kind of fucked in this case
          throw new RPCError(`Received data chunk for another RPC request whose msgid (${msgid}) does not match the previous request's msgid (${expectedMsgId}).`)
        }

        const rpcQueueHead = this.rpcQueue.pop()
        if (rpcQueueHead) {
          this.socket.write(encodeMessagePackRequest(rpcQueueHead))
        }

      }
    })

    this.socket.on('error', (err) => {
      console.error(err)
      // Reject the promise with an RPCError
      this.rpcPending.reject(new RPCError("Failed to process RPC request", err))
    })

  }

  RPC(req: MessagePackRequest): Promise<MessagePackResponse> {
    return new Promise((resolve, reject) => {
      if (this.rpcPending) {
        // No current RPC calls are awaiting data and so we can safely perform this call
        this.socket.write(encodeMessagePackRequest(req))
      } else {
        // Otherwise, queue this call up to be executed next.
        // Queueing avoids needing to worry about data chunks from different
        // RPC calls coming back in a different order.
        console.log('Enqueuing operation onto queue')
        this.rpcQueue.push(req)
      }
      this.rpcPending = {
        msgpack: req,
        resolve: resolve,
        reject: reject
      }
    })
  }

  Close() {
    this.socket.destroy()
  }
}
