const nvimPrimitiveTypes = ["Boolean", "Integer", "Float", "String", "Dict", "Object"] as const
export type NVIM_PRIMITIVE = (typeof nvimPrimitiveTypes[number])

const nvimSpecialTypes = ["Buffer", "Tabpage", "Window"] as const
export type NVIM_SPECIAL = (typeof nvimSpecialTypes[number])

type NVIM_PRIMITIVE_SPECIAL = NVIM_PRIMITIVE | NVIM_SPECIAL

export function isNvimPrimitive(value: any): value is NVIM_PRIMITIVE {
  return typeof value === "string" && nvimPrimitiveTypes.includes(value as any)
}

export function isNvimSpecial(value: any): value is NVIM_SPECIAL {
  return typeof value === "string" && nvimSpecialTypes.includes(value as any)
}
export type NVIM_ARRAY = `Array` | `Array(${NVIM_PRIMITIVE_SPECIAL})` | `ArrayOf(${NVIM_PRIMITIVE_SPECIAL})`;
export type NVIM_ALL = NVIM_PRIMITIVE | NVIM_SPECIAL | NVIM_ARRAY

type NVIM_EXT_RETURN<T> = {
  type: T,
  data: number[]
}
export type NVIM_BUFFER_EXT_RETURN = NVIM_EXT_RETURN<0>
export type NVIM_WINDOW_EXT_RETURN = NVIM_EXT_RETURN<1>
export type NVIM_TABPAGE_EXT_RETURN = NVIM_EXT_RETURN<2>

export type NVIM_RETURN = NVIM_ALL | "void" 
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
  types: {
    [K in NVIM_SPECIAL]: {
      id: number,
      prefix: string
    }
  }
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


