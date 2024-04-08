import { parse } from 'date-fns';

/**
 * filter(Boolean) => filter(isNonNullable) 대체 사용
 */
export function isNonNullable<T>(
  value?: T | undefined | null | false,
): value is T {
  return !!value;
}

/**
 * Format Bytes
 * @param bytes 바이트
 * @param decimals 소숫점
 * @returns 변환된 값
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 초 -> 00:00:00 포맷으로 변경경
 * @param seconds 초
 * @returns 파싱 텍스트
 */
export function secondsToTimeText(seconds: number): string {
  let digit: number = seconds;
  let text = '';

  if (digit >= 60 * 24) {
    text += `00${Math.floor(digit / (60 * 24))}`.slice(-2) + ':';
    digit = digit % (60 * 24);
  } else {
    text += '00:';
  }

  if (digit >= 60) {
    text += `00${Math.floor(digit / 60)}`.slice(-2) + ':';
    digit = digit % 60;
  } else {
    text += '00:';
  }

  text += `00${digit}`.slice(-2);

  return text;
}

/**
 * String -> Date
 * @param text 변환 텍스트
 * @param format 텍스트의 포맷
 * @returns Date
 */
export function stringToDate(text: string, format?: string): Date {
  return parse(text, format || 'yyyy-MM-dd', new Date());
}

/**
 * 하이라이트 대상 선별 정규식
 * @param keywords 키워드 목록
 * @returns 정규식
 */
const getHighlightRex = (keywords: string[]): RegExp => {
  return new RegExp(
    keywords
      .filter(isNonNullable)
      .map((k) => k.replaceAll('(', '\\(').replaceAll(')', '\\)'))
      .join('|'),
    'gi',
  );
};

/**
 * 하이라이트 태그 추가한 텍스트로 변환
 * @param text 변환 전
 * @param keyword 하이라이트 키워드
 * @returns 변환 후
 */
export const getHighlight = (text: string, keyword?: string): string => {
  let msg = text;

  if (keyword) {
    msg = msg.replaceAll(getHighlightRex([keyword]), `<em class="hl">$&</em>`);
  }

  return msg;
};
