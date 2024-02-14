declare module 'dto' {
  /**
   * 아카이브 응답 규칙 (response는 반드시 이 형태를 따른다)
   * @description T : body 타입
   * @description isListBody : 목록 데이터 여부, 목록 데이터인 경우 T는 list 데이터 하나 타입
   */
  export interface IArchiveResponse<T, isListBody = true> {
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
   * 코드 데이터
   */
  export interface ICd {
    seq: null | number;
    group: null | string;
    ordNo: null | number;
    /**
     * group + seq UNIQUE한 문자
     */
    cdId?: null | string;
    cdNm: null | string;
    cdNmEng?: null | string;
    usedYn: null | 'Y' | 'N';
    regId: null | string;
    regDt: null | string;
    modId?: null | string;
    modDt?: null | string;
    etc1?: null | string;
    etc2?: null | string;
    comment?: null | string;
  }

  /**
   * 사진 컨텐츠
   */
  export interface IContPhoto {
    contId: null | number;
    contType: null | string;
    /**
     * 이미지 종류
     * - `01` 미정
     * - `02` 미정
     */
    imgType?: null | '01' | '02';
    /**
     * 컨텐츠의 서비스 상태
     * - `00` 중지됨
     * - `01` 서비스 중
     * - `99` 삭제됨
     * @default 00
     */
    serviceStatus: null | '00' | '01' | '99';
    title: null | string;
    mediaCode: null | string;
    source: null | string;
    departNo?: null | number;
    /**
     * 아카이빙 상태
     * - `00` : 아카이브 등록 전
     * - `01` : 검토 중
     * - `99` : 아카이브 등록 완료
     * @default 00
     */
    archStatus: null | '00' | '01' | '99';
    caption?: null | string;
    keyword?: null | string;
    format: null | string;
    width: null | number;
    height: null | number;
    dpi: null | number;
    /**
     * 촬영일
     */
    shootDt: null | string;
    /**
     * 촬영장소
     */
    shootPlace: null | string;
    fileSize: null | number;
    fileName: null | string;
    filePath: null | string;
    orgFileName: null | string;
    /**
     * 결제해야 볼 수 있는 컨텐츠인지
     */
    payYn: null | 'Y' | 'N';
    /**
     * 성인 컨텐츠 여부
     */
    adultYn: null | 'Y' | 'N';
    /**
     * 사용 허가 여부
     * - `Y` 허가 받았음 (바로 사용 가능)
     * - `N` 허가받지 않았음. 사용하려면 저작권자에게 허가 받아야함.
     * @default N 허가받지 않은 상태
     */
    permissionYn: null | 'Y' | 'N';
    /**
     * 저작권자
     */
    copyrt?: null | string;
    regId: null | string;
    regDt: null | string;
    modId?: null | string;
    modDt?: null | string;
    delId?: null | string;
    delDt?: null | string;
    hashcode: null | string;
    /**
     * 인물 사진 여부
     * @default N
     */
    peopleYn: null | 'Y' | 'N';
    /**
     * 인물 사진일 경우 인물 유형
     * - `00` 상반신
     * - `01` 전신
     * - `02` 하반신
     */
    peopleType?: null | '00' | '01' | '02';
  }

  /**
   * 기사 컨텐츠
   */
  export interface IContArticle {}
}
