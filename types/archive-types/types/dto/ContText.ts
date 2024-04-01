import { isAfter } from "date-fns";
import { IContTextParams } from "../params";
import { ICont, Cont } from "./Cont";

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
 * 문서컨텐츠
 * @extends Cont
 */
export class ContText extends Cont implements IContText {
  textType: "00" | "01" | "99" | null;
  writers: string[] | null;
  subTitle: string | null;
  body: string | null;

  /**
   * @override constructor
   * @param params 선택 데이터
   */
  constructor(params?: Record<string, any>) {
    super("T", params);

    this.textType = params?.["textType"] || "99";
    this.writers = params?.["writers"] || [];
    this.subTitle = params?.["subTitle"] || null;
    this.body = params?.["body"] || null;
  }

  /**
   * @override
   * @returns IContText
   */
  get(): IContText {
    return {
      ...super.get(),
      textType: this.textType,
      writers: this.writers,
      subTitle: this.subTitle,
      body: this.body,
    };
  }

  /**
   * 검색조건에 부합하는지 확인
   * @param params 문서컨텐츠 검색 조건
   * @returns match 여부
   */
  public matchSearchParams(params: IContTextParams): boolean {
    const { startDt, endDt, textType, keyword } = params;

    let match = true;

    if (this.regDt) {
      const date = super.parse(this.regDt);

      if (startDt) {
        match = match && isAfter(date, super.parse(`${startDt} 00:00:00`));
      }

      if (endDt) {
        match = match && isAfter(super.parse(`${endDt} 00:00:00`), date);
      }
    }

    if (textType && this.textType) {
      match = match && textType === this.textType;
    }

    if (keyword && this.title) {
      const reg = new RegExp(keyword, "ig");
      match = match && reg.test(this.title);
    }

    return match;
  }
}
