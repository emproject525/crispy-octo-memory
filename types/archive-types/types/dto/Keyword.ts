/**
 * 키워드
 */
export interface IKeyword {
  /**
   * 일련번호
   */
  readonly seq: number;

  /**
   * 등록자 ID
   */
  regId: null | string;

  /**
   * 등록일
   */
  regDt: null | string;

  /**
   * 키워드
   */
  keyword: string;
}
