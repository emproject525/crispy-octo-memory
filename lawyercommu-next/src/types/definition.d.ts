/**
 * 응답 규칙 (response는 반드시 이 형태를 따른다)
 * @description T : body 타입
 */
export interface IRes<T> {
  header: {
    success: boolean; // 로직의 성공 여부
    status: number;
    // message: string; // i18n 메세지
    // messageOptions?: Record<string, string>; // i18n 메세지옵션
  };
  body: T;
}

export default IRes;
