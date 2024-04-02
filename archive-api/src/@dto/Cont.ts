import { ContType, ICont } from 'archive-types';
import { format, parse as dateFnsParse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { removeNulls } from 'utils';

/**
 * 컨텐츠
 */
export class Cont implements ICont {
  readonly contId: number;
  contType: ContType;
  archStatus: '00' | '01' | '99';
  serviceStatus: '00' | '01' | '99';
  permissionYn: 'Y' | 'N';
  copyrt: string | null;
  title: string | null;
  media: number | null;
  source: number | null;
  department: number | null;
  caption: string | null;
  keyword: string | null;
  regId: string | null;
  regDt: string | null;
  modId: string | null;
  modDt: string | null;
  delId: string | null;
  delDt: string | null;
  payYn: 'Y' | 'N' | null;
  adultYn: 'Y' | 'N' | null;

  /**
   * @param contType 컨텐츠 타입
   * @param params 선택 데이터
   */
  constructor(contType: ContType, params?: Record<string, any>) {
    const curDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    this.contId = params?.['contId'] || new Date().getTime();
    this.contType = contType;
    this.archStatus = params?.['archStatus'] || '00';
    this.serviceStatus = params?.['serviceStatus'] || '01';
    this.permissionYn = params?.['permissionYn'] || 'N';
    this.copyrt = params?.['copyrt'] || null;
    this.title = params?.['title'] || null;
    this.media = params?.['media'] || null;
    this.source = params?.['source'] || null;
    this.department = params?.['department'] || null;
    this.caption = params?.['caption'] || null;
    this.keyword = params?.['keyword'] || null;
    this.regId = params?.['regId'] || null;
    this.regDt = params?.['regDt'] || curDate;
    this.modId = params?.['modId'] || null;
    this.modDt = params?.['modDt'] || null;
    this.delId = params?.['delId'] || null;
    this.delDt = params?.['delDt'] || null;
    this.payYn = params?.['payYn'] || 'N';
    this.adultYn = params?.['adultYn'] || 'N';
  }

  /**
   * 서비스 중인가
   * @returns 서비스 여부
   */
  public inService() {
    return this.serviceStatus === '01';
  }

  /**
   * 허가받았는가
   * @returns 허가 여부
   */
  public inPemission() {
    return this.permissionYn === 'Y';
  }

  /**
   * 날짜텍스트를 Date로 파싱
   * @param dateText yyyy-MM-dd HH:mm:ss
   * @returns Date
   */
  public parse(dateText: string): Date {
    return dateFnsParse(dateText, 'yyyy-MM-dd HH:mm:ss', new Date(), {
      locale: ko
    });
  }

  /**
   * 컨텐츠만 리턴
   * @returns ICont
   */
  public get(): ICont {
    return removeNulls<ICont>({
      contId: this.contId,
      contType: this.contType,
      adultYn: this.adultYn,
      archStatus: this.archStatus,
      caption: this.caption,
      copyrt: this.copyrt,
      department: this.department,
      keyword: this.keyword,
      permissionYn: this.permissionYn,
      serviceStatus: this.serviceStatus,
      source: this.source,
      title: this.title,
      payYn: this.payYn,
      regId: this.regId,
      regDt: this.regDt,
      modId: this.modId,
      modDt: this.modDt,
      media: this.media,
      delId: this.delId,
      delDt: this.delDt
    });
  }
}
