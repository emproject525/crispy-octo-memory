import { isAfter, parse } from 'date-fns';
import { IRes } from 'archive-types';
import { ko } from 'date-fns/locale/ko';

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
export function make500Response(message: string): IRes<boolean, false> {
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

/**
 * String -> Date
 * @param text 변환 텍스트
 * @param format 텍스트의 포맷
 * @returns Date
 */
export function stringToDate(text: string, format?: string): Date {
  return parse(text, format || 'yyyy-MM-dd', new Date(), {
    locale: ko
  });
}

/**
 * 비교날짜가 시작일 종료일 사이인지 체크
 * @param compareDt 비교날짜
 * @param startDt 시작일
 * @param endDt 종료일
 * @returns 사이의 날짜인가?
 */
export function isBetweenStartEndDt(
  compareDt?: string | null,
  startDt?: string,
  endDt?: string
): boolean {
  if (!compareDt) {
    return true;
  }

  let match = true;
  const dt = stringToDate(compareDt, 'yyyy-MM-dd HH:mm:ss');

  if (startDt) {
    match =
      match &&
      isAfter(dt, stringToDate(`${startDt} 00:00:00`, 'yyyy-MM-dd HH:mm:ss'));
  }

  if (endDt) {
    match = match && isAfter(stringToDate(`${endDt} 00:00:00`), dt);
  }

  return match;
}
