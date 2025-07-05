import { encode, decode, Decoder} from '@msgpack/msgpack';

export interface MessagePackRequest {
  type: 0,
  msgid: number,
  method: string,
  params: any[]
}

export function encodeMessagePackRequest(req: MessagePackRequest): Uint8Array {
  return encode([req.type, req.msgid, req.method, req.params])
}

export function decodeMessagePackResponse(res: Buffer | unknown): MessagePackResponse | undefined {
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
  } catch{
  }
}

export interface MessagePackResponse {
  type: 1,
  msgid: number,
  error: string | null | undefined,
  result: any
}


