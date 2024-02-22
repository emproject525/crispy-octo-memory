import { IArchiveResponse } from 'dto';

export type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends (infer U)[]
    ? RecursivelyReplaceNullWithUndefined<U>[]
    : T extends Record<string, unknown>
      ? { [K in keyof T]: RecursivelyReplaceNullWithUndefined<T[K]> }
      : T;

/**
 * null -> undefined
 * @param obj null 있는 데이터
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

/**
 * 500 응답 생성
 * @param message header.message 내용
 * @returns 500 응답 (body = false)
 */
export function make500Response(
  message: string
): IArchiveResponse<boolean, false> {
  return {
    header: {
      success: false,
      message,
      status: 500
    },
    body: false
  };
}
