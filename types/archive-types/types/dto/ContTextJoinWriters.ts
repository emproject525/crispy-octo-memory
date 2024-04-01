import { isAfter } from "date-fns";
import { IContTextParams } from "../params";
import { IWriter, Writer } from "./Writer";
import { Cont } from "./Cont";
import { IContText } from "./ContText";

/**
 * 문서컨텐츠 타입 (writers 조인)
 */
export interface IContTextJoinWriters extends Omit<IContText, "writers"> {
  writers: null | IWriter[];
}

/**
 * 문서컨텐츠 (작가 목록)
 * @extends Cont
 */
export class ContTextJoinWriters extends Cont implements IContTextJoinWriters {
  textType: "00" | "01" | "99" | null;
  writers: Writer[] | null;
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
  get(): IContTextJoinWriters {
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
