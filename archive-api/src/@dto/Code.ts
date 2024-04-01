import { format } from 'date-fns';
import { ICode } from 'archive-types';

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
  usedYn: 'Y' | 'N';
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
    this.ordNo = params?.['ordNo'] || 0;
    this.cdId = `${group}-${seq}`;
    this.cdNm = params?.['cdNm'] || null;
    this.cdNmEng = params?.['cdNmEng'] || null;
    this.usedYn = params?.['usedYn'] || 'Y';
    this.regId = params?.['regId'] || null;
    this.regDt = params?.['regDt'] || format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.modId = params?.['modId'] || null;
    this.modDt = params?.['modDt'] || null;
    this.caption = params?.['caption'] || null;
  }
}
