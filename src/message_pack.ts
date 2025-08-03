import { encode, decode } from '@msgpack/msgpack'

export interface MessagePackRequest {
  type: 0,
  msgid: number,
  method: string,
  params: any[]
}

export interface MessagePackResponse {
  type: 1,
  msgid: number,
  error: string | null | undefined,
  result: any
}

export function encodeMessagePackRequest(req: MessagePackRequest): Uint8Array {
  return encode([req.type, req.msgid, req.method, req.params])
}

function tryDecodeMessagePackResponse(res: Buffer | Uint8Array | unknown): unknown | undefined {
  try {
    if (Buffer.isBuffer(res) || res instanceof Uint8Array) {
      return decode(res)
    }
  }
  catch { }
}

function recursiveDecodeMessagePackResponse(res: object): object {
  Object.entries(res).forEach(([key, value]) => {
    console.log(`${key}->${value}`)
    const decoded = tryDecodeMessagePackResponse(value);
    if (decoded !== undefined) {
      // If it's a successful decode, replace the original
      (res as any)[key] = decoded;
      // If decoded is an object, continue decoding its contents
      if (typeof decoded === 'object' && decoded !== null) {
        recursiveDecodeMessagePackResponse(decoded as object);
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recursively decode nested objects or arrays
      recursiveDecodeMessagePackResponse(value as object);
    }
  });

  return res;
}


export function decodeMessagePackResponse(res: Buffer | unknown): MessagePackResponse | undefined {
  const decoded = tryDecodeMessagePackResponse(res)

  if (decoded && typeof decoded === "object") {
    const decodedObjectEntries = Object.values(decoded)
    if (decodedObjectEntries.length == 4) {
      let result = decodedObjectEntries[3]

      // Message pack lib does not recursively decode for us
      // As per MessagePackRPC spec, result is 'An arbitrary object, which represents the returned result of the function. 
      // So an RPC server could return a result which is also messagepack encoded
      // handle the case where the result needs decoding further... this is handled recursively.
      if (typeof result == "object") {
        console.log(`attempting recursive decode`)
        result = recursiveDecodeMessagePackResponse(result)
      }

      return {
        type: 1,
        msgid: decodedObjectEntries[1],
        error: decodedObjectEntries[2],
        result: result
      }
    }
    return decoded as MessagePackResponse
  }
}

