import { format } from "date-fns";

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

/**
 *  코드
 */
export class Code implements ICode {
  seq: number;
  group: string;
  ordNo: number | null;
  cdId: string;
  cdNm: string | null;
  cdNmEng: string | null;
  usedYn: "Y" | "N";
  regId: string | null;
  regDt: string | null;
  modId: string | null;
  modDt: string | null;
  caption: string | null;

  /**
   *
   * @param seq 일련번호
   * @param group 그룹명
   * @param params 선택 데이터
   */
  constructor(seq: number, group: string, params?: Record<string, any>) {
    this.seq = seq;
    this.group = group;
    this.ordNo = params?.["ordNo"] || 0;
    this.cdId = `${group}-${seq}`;
    this.cdNm = params?.["cdNm"] || null;
    this.cdNmEng = params?.["cdNmEng"] || null;
    this.usedYn = params?.["usedYn"] || "Y";
    this.regId = params?.["regId"] || null;
    this.regDt = params?.["regDt"] || format(new Date(), "yyyy-MM-dd HH:mm:ss");
    this.modId = params?.["modId"] || null;
    this.modDt = params?.["modDt"] || null;
    this.caption = params?.["caption"] || null;
  }
}
