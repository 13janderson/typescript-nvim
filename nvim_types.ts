type NVIM_ARRAY = "Array" 
type NVIM_BASIC_TYPES = "Nil" | "Boolean" | "Integer" | "Float" | "String" | "Dict" | NVIM_ARRAY;
type NVIM_SPECIAL_TYPES = "Buffer" | "Window" | "Tabpage"
type NVIM_NON_NIL_TYPES = Exclude<NVIM_BASIC_TYPES, "Nil"> | NVIM_SPECIAL_TYPES
type NVIM_ARRAY_TYPE = `${NVIM_ARRAY}(${NVIM_NON_NIL_TYPES})` | `ArrayOf(${NVIM_NON_NIL_TYPES})`;

export type NVIM_RETURN_TYPES = NVIM_NON_NIL_TYPES | NVIM_ARRAY_TYPE | "void"
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
    return_type?: NVIM_RETURN_TYPES,
    method: boolean,
    parameters: [NVIM_NON_NIL_TYPES, string][],
    deprecated_since?: number
  }[],
}


// Debugging function to recursively print an object and all of its nested properties
export function logObject(obj: object, call_count: number) {
  Object.entries(obj).forEach(([key, value]) => {
    console.log(`${"\t".repeat(call_count)}${key}:${value}`)
    if (value && typeof value === "object") {
      logObject(value, call_count + 1)
    }
  })
}


