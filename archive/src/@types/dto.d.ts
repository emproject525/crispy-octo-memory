declare module 'dto' {
  /**
   * 컨텐츠 타입
   * - `P` PHOTO 사진
   * - `G` GRAPHIC 그래픽
   * - `T` TEXT 텍스트
   * - `V` VIDEO 비디오
   * - `A` AUDIO 오디오
   */
  export type ContType = 'P' | 'G' | 'T' | 'V' | 'A';

  /**
   * 사진 컨텐츠
   */
  export interface IContPhoto {
    contId: null | number;
    contType: null | ContType;
    /**
     * 이미지 종류
     * - `00` 일반
     * - `01` 만화
     * - `02` 일러스트
     * - `03` 지도
     * - `99` 기타
     * @default 00
     */
    imgType?: null | '00' | '01' | '02' | '03' | '99';
    /**
     * 컨텐츠의 서비스 상태
     * - `00` 중지됨
     * - `01` 서비스 중
     * - `99` 삭제됨
     * @default 00
     */
    serviceStatus: null | '00' | '01' | '99';
    title: null | string;
    media: null | number;
    source: null | number;
    department?: null | number;
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
    meta?: string;
    /**
     * 촬영일
     */
    shootDt: null | string;
    /**
     * 촬영 장소
     */
    shootPlace: null | string;
    /**
     * 촬영 유형
     * - `00` 일반
     * - `01` 위성
     * - `02` 수중
     * - `99` 기타
     * @default 00
     */
    shootType?: null | '00' | '01' | '02' | '99';
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
}
