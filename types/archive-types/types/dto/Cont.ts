import { parse as dateFnsParse, format } from "date-fns";
import { ko } from "date-fns/locale/ko";

/**
 * 컨텐츠 타입
 * - `P` PHOTO 사진
 * - `T` TEXT 텍스트
 * - `V` VIDEO 비디오
 * - `A` AUDIO 오디오
 */
export type ContType = "P" | "T" | "V" | "A";

/**
 * 컨텐츠 타입
 */
export interface ICont {
  /**
   * 컨텐츠ID
   */
  readonly contId: number;

  /**
   * 컨텐츠 타입
   */
  readonly contType: ContType;

  /**
   * 아카이빙 상태
   * - `00` : 아카이브 등록 전
   * - `01` : 검토 중
   * - `99` : 아카이브 등록 완료
   * @default "00"
   */
  archStatus: "00" | "01" | "99";

  /**
   * 컨텐츠의 서비스 상태
   * - `00` 중지됨
   * - `01` 서비스 중
   * - `99` 삭제됨
   * @default "01"
   */
  serviceStatus: "00" | "01" | "99";

  /**
   * 사용 허가 여부
   * - `Y` 허가 받았음 (바로 사용 가능)
   * - `N` 허가받지 않았음. 사용하려면 저작권자에게 허가 받아야함.
   * @default "N"
   */
  permissionYn: "Y" | "N";

  /**
   * 저작권자
   */
  copyrt: null | string;

  /**
   * 제목
   */
  title: null | string;

  /**
   * 매체
   */
  media: null | number;

  /**
   * 출처
   */
  source: null | number;

  /**
   * 부서
   */
  department: null | number;

  /**
   * 설명
   */
  caption: null | string;

  /**
   * 키워드
   */
  keyword: null | string;

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
   * 삭제자 ID
   */
  delId: null | string;

  /**
   * 삭제일
   */
  delDt: null | string;

  /**
   * 결제해야 볼 수 있는 컨텐츠인지
   * @default "N"
   */
  payYn: null | "Y" | "N";

  /**
   * 성인 컨텐츠 여부
   * @default "N"
   */
  adultYn: null | "Y" | "N";
}

/**
 * 컨텐츠
 */
export class Cont implements ICont {
  readonly contId: number;
  contType: ContType;
  archStatus: "00" | "01" | "99";
  serviceStatus: "00" | "01" | "99";
  permissionYn: "Y" | "N";
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
  payYn: "Y" | "N" | null;
  adultYn: "Y" | "N" | null;

  /**
   * @param contType 컨텐츠 타입
   * @param params 선택 데이터
   */
  constructor(contType: ContType, params?: Record<string, any>) {
    const curDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    this.contId = params?.["contId"] || new Date().getTime();
    this.contType = contType;
    this.archStatus = params?.["archStatus"] || "00";
    this.serviceStatus = params?.["serviceStatus"] || "01";
    this.permissionYn = params?.["permissionYn"] || "N";
    this.copyrt = params?.["copyrt"] || null;
    this.title = params?.["title"] || null;
    this.media = params?.["media"] || null;
    this.source = params?.["source"] || null;
    this.department = params?.["department"] || null;
    this.caption = params?.["caption"] || null;
    this.keyword = params?.["keyword"] || null;
    this.regId = params?.["regId"] || null;
    this.regDt = params?.["regDt"] || curDate;
    this.modId = params?.["modId"] || null;
    this.modDt = params?.["modDt"] || null;
    this.delId = params?.["delId"] || null;
    this.delDt = params?.["delDt"] || null;
    this.payYn = params?.["payYn"] || "N";
    this.adultYn = params?.["adultYn"] || "N";
  }

  /**
   * 서비스 중인가
   * @returns 서비스 여부
   */
  public inService() {
    return this.serviceStatus === "01";
  }

  /**
   * 허가받았는가
   * @returns 허가 여부
   */
  public inPemission() {
    return this.permissionYn === "Y";
  }

  /**
   * 날짜텍스트를 Date로 파싱
   * @param dateText yyyy-MM-dd HH:mm:ss
   * @returns Date
   */
  public parse(dateText: string): Date {
    return dateFnsParse(dateText, "yyyy-MM-dd HH:mm:ss", new Date(), {
      locale: ko,
    });
  }

  /**
   * 컨텐츠만 리턴
   * @returns ICont
   */
  public get(): ICont {
    return {
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
      delDt: this.delDt,
    };
  }
}
