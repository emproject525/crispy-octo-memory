import { IWriter } from ".";
import { ICont } from "./Cont";

/**
 * 문서컨텐츠 타입
 */
export interface IContText extends ICont {
  /**
   * 문서 타입
   * - `00` 기사
   * - `01` 인터뷰
   * - `99` 기타
   * @default "99"
   */
  textType: null | "00" | "01" | "99";

  /**
   * 작가 목록 (id만 있는 string 배열)
   */
  writers: null | string[];

  /**
   * 부제목
   */
  subTitle: null | string;

  /**
   * 본문
   */
  body: null | string;
}

/**
 * 문서컨텐츠 타입 (writers 조인)
 */
export interface IContTextJoinWriters extends Omit<IContText, "writers"> {
  writers: null | IWriter[];
}
