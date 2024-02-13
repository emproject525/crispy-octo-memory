declare module 'dto' {
  /**
   * 아카이브 응답 규칙 (response는 반드시 이 형태를 따른다)
   * @description T : body 타입
   * @description isListBody : 목록 데이터 여부, 목록 데이터인 경우 T는 list 데이터 하나 타입
   */
  export interface ArchiveResponse<T, isListBody = true> {
    header: {
      success: boolean; // 로직의 성공 여부
      status: number;
      message: string; // i18n 메세지
      messageOptions?: Record<string, string>; // i18n 메세지옵션
    };
    body?: isListBody extends true
      ? {
          totalCount: number;
          keywords: string[];
          list: T[];
        }
      : T;
  }

  /**
   * 사진 컨텐츠
   */
  export interface ContPhoto {
    contId: number;
    contType: string;
    /**
     * 컨텐츠의 서비스 상태
     * - `00` 서비스 중
     * - `01` 서비스 멈춤
     * - `99` 삭제됨
     */
    serviceStatus: '00' | '01' | '99';
    title: string;
    mediaCode: string;
    source: string;
    departNo?: number;
    /**
     * 아카이빙 상태
     * - `00` : 아카이브 등록 전
     * - `01` : 검토 중
     * - `99` : 아카이브 등록 완료
     */
    archStatus: '00' | '01' | '99';
    caption?: string;
    keyword?: string;
    format: string;
    width: number;
    height: number;
    dpi: number;
    /**
     * 촬영일
     */
    shootDt: string;
    /**
     * 촬영장소
     */
    shootPlace: string;
    fileSize: number;
    fileName: string;
    filePath: string;
    orgFileName: string;
    /**
     * 결제해야 볼 수 있는 컨텐츠인지
     */
    payYn: 'Y' | 'N';
    /**
     * 성인 컨텐츠 여부
     */
    adultYn: 'Y' | 'N';
    /**
     * 사용 허가 여부
     * @default N 허가받지 않은 상태
     * - `Y` 허가 받았음 (바로 사용 가능)
     * - `N` 허가받지 않았음. 사용하려면 저작권자에게 허가 받아야함.
     */
    permissionYn: 'Y' | 'N';
    /**
     * 저작권자
     */
    copyrt?: string;
    regId: string;
    regDt: string;
    modId?: string;
    modDt?: string;
    delId?: string;
    delDt?: string;
    hashcode: string;
  }

  /**
   * 기사 컨텐츠
   */
  export interface ContArticle {}
}
