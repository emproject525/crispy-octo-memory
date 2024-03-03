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
