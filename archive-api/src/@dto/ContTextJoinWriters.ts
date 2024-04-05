import { IContTextJoinWriters, IContTextParams, IWriter } from 'archive-types';
import { Cont } from './Cont';
import { isAfter } from 'date-fns';
import { removeNulls } from 'utils';

/**
 * 문서컨텐츠 (작가 목록)
 * @extends Cont
 */
export class ContTextJoinWriters extends Cont implements IContTextJoinWriters {
  textType: '00' | '01' | '99' | null;
  writers: IWriter[] | null;
  subTitle: string | null;
  body: string | null;

  /**
   * @override constructor
   * @param params 선택 데이터
   */
  constructor(params?: Record<string, any>) {
    super('T', params);

    this.textType = params?.['textType'] || '99';
    this.writers = params?.['writers'] || [];
    this.subTitle = params?.['subTitle'] || null;
    this.body = params?.['body'] || null;
  }

  /**
   * @override
   * @param noBody 본문 제거 여부
   * @returns IContTextJoinWriters
   */
  get(noBody?: boolean): IContTextJoinWriters {
    return removeNulls<IContTextJoinWriters>({
      ...super.get(),
      textType: this.textType,
      writers: this.writers,
      subTitle: this.subTitle,
      body: noBody ? null : this.body
    });
  }

  /**
   * 검색조건에 부합하는지 확인
   * @param params 문서컨텐츠 검색 조건
   * @returns match 여부
   */
  public matchSearchParams(params: IContTextParams): boolean {
    const { startDt, endDt, textType, keyword } = params;

    let match = super.inService();

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
      const reg = new RegExp(keyword, 'ig');
      match = match && reg.test(this.title);
    } else if (keyword && !this.title) {
      match = false;
    }

    return match;
  }
}
