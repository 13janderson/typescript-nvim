
const nvimPrimitiveTypes = ["Boolean", "Integer", "Float", "String", "Dict", "Object", "Buffer", "Tabpage", "Window"] as const
export type NVIM_PRIMITIVE = (typeof nvimPrimitiveTypes[number]) 
export function isNvimPrimitive(value: any): value is NVIM_PRIMITIVE {
  return typeof value === "string" && nvimPrimitiveTypes.includes(value as any)
}
export type NVIM_ARRAY = `Array` | `Array(${NVIM_PRIMITIVE})` | `ArrayOf(${NVIM_PRIMITIVE})` ;
export type NVIM_RETURN = NVIM_PRIMITIVE | NVIM_ARRAY | "void"
export type NVIM_API_INFO = {
  version: {
    major: number,
    minor: number,
    patch: number,
    prerelease: boolean,
    api_level: number,
    api_compatible: number,
    api_prerelease: boolean,
    build: unknown // Fuck knows
  },
  functions: {
    since: number,
    name: string,
    return_type?: NVIM_RETURN,
    method: boolean,
    parameters: [NVIM_PRIMITIVE, string][],
    deprecated_since?: number
  }[],
}


// Debugging function to recursively print an object and all of its nested properties
export function logObject(obj: object, call_count: number = 0) {
  Object.entries(obj).forEach(([key, value]) => {
    console.log(`${"\t".repeat(call_count)}${key}:${value}`)
    if (value && typeof value === "object") {
      logObject(value, call_count + 1)
    }
  })
}


