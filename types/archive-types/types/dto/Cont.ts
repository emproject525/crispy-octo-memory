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
