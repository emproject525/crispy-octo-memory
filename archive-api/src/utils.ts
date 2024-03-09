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

/**
 * filter(Boolean) => filter(isNonNullable) 대체 사용
 */
export function isNonNullable<T>(
  value?: T | undefined | null | false
): value is T {
  return !!value;
}

/**
 * 시작 종료 count 계산
 * @param count 전체 건수
 * @param size 한 페이지 크기
 * @param page 요청 페이지
 * @returns number[]
 */
export function getStartEnd(
  count: number,
  size: number,
  page: number
): number[] {
  let start = 0;
  let end = 0;

  const totalPage = Math.ceil(count / size);
  if (page > totalPage) {
    start = 0;
    end = 0 + size;
  } else {
    start = (page - 1) * size + 1;
    end = start + size - 1;
    end = end > count ? count : end;
  }

  return [start, end];
}
