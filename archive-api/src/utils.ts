export type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends (infer U)[]
    ? RecursivelyReplaceNullWithUndefined<U>[]
    : T extends Record<string, unknown>
      ? { [K in keyof T]: RecursivelyReplaceNullWithUndefined<T[K]> }
      : T;

/**
 * null -> undefined
 * @param obj null도 있는 데이터
 * @returns null 없는 데이터
 */
export function removeNulls<T>(obj: T): RecursivelyReplaceNullWithUndefined<T> {
  if (obj === null || obj === undefined) {
    return undefined as any;
  }

  if ((obj as any).constructor.name === 'Object' || Array.isArray(obj)) {
    for (const key in obj) {
      obj[key] = removeNulls(obj[key]) as any;
    }
  }
  return obj as any;
}
