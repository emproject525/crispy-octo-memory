/**
 * 코드 타입
 */
export interface ICode {
  /**
   * 일련번호
   */
  readonly seq: number;

  /**
   * 그룹명
   */
  readonly group: string;

  /**
   * 코드 순서
   * @default 0
   */
  ordNo: null | number;

  /**
   * group + seq UNIQUE한 문자
   */
  readonly cdId: string;

  /**
   * 코드명
   */
  cdNm: null | string;

  /**
   * 코드영문명
   */
  cdNmEng: null | string;

  /**
   * 사용여부
   * @default "Y"
   */
  usedYn: "Y" | "N";

  /**
   * 등록자 ID
   */
  regId: null | string;

  /**
   * 등록일
   */
  regDt: null | string;

  /**
   * 수정자 ID
   */
  modId: null | string;

  /**
   * 수정일
   */
  modDt: null | string;

  /**
   * 설명
   */
  caption: null | string;
}

/**
 * 그룹 타입
 */
export type GroupType = "IMG_TYPE" | "SOURCE" | "MEDIA" | "DEPARTMENT";
