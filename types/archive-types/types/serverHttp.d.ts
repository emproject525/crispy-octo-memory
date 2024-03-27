/**
 * 아카이브 응답 규칙 (response는 반드시 이 형태를 따른다)
 * @description T : body 타입
 * @description isListBody : 목록 데이터 여부, 목록 데이터인 경우 T는 list 데이터 하나 타입
 */
export interface IRes<T, isListBody = true> {
  header: {
    success: boolean; // 로직의 성공 여부
    status: number;
    message: string; // i18n 메세지
    messageOptions?: Record<string, string>; // i18n 메세지옵션
  };
  body?: isListBody extends true
    ? {
        list: T[];
        count: number;
        keywords: string[];
      }
    : T;
}

export default IRes;
