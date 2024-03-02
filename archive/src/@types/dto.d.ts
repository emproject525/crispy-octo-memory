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
   * 코드 그룹
   */
  export type CodeGroupType = 'SOURCE' | 'MEDIA' | 'DEPARTMENT';

  /**
   * 코드
   */
  export interface ICode {
    seq: number;
    group: string;
    ordNo: number;
    cdNm: string;
    usedYn: 'Y' | 'N';
    regId?: string;
    regDt?: string;
    cdId: string;
  }

  /**
   * 사진 컨텐츠
   */
  export interface IContPhoto {
    contId: number;
    contType: ContType;
    /**
     * 이미지 종류
     * - `00` 일반
     * - `01` 만화
     * - `02` 일러스트
     * - `03` 지도
     * - `99` 기타
     * @default 00
     */
    imgType?: '00' | '01' | '02' | '03' | '99';
    /**
     * 컨텐츠의 서비스 상태
     * - `00` 중지됨
     * - `01` 서비스 중
     * - `99` 삭제됨
     * @default 00
     */
    serviceStatus: '00' | '01' | '99';
    title?: string;
    media?: number;
    source?: number;
    department?: number;
    /**
     * 아카이빙 상태
     * - `00` : 아카이브 등록 전
     * - `01` : 검토 중
     * - `99` : 아카이브 등록 완료
     * @default 00
     */
    archStatus: '00' | '01' | '99';
    caption?: string;
    keyword?: string;
    format?: string;
    width?: number;
    height?: number;
    dpi?: number;
    meta?: string;
    /**
     * 촬영일
     */
    shootDt?: string;
    /**
     * 촬영 장소
     */
    shootPlace?: string;
    /**
     * 촬영 유형
     * - `00` 일반
     * - `01` 위성
     * - `02` 수중
     * - `99` 기타
     * @default 00
     */
    shootType?: '00' | '01' | '02' | '99';
    fileSize?: number;
    fileName?: string;
    filePath?: string;
    orgFileName?: string;
    /**
     * 결제해야 볼 수 있는 컨텐츠인지
     */
    payYn?: 'Y' | 'N';
    /**
     * 성인 컨텐츠 여부
     */
    adultYn?: 'Y' | 'N';
    /**
     * 사용 허가 여부
     * - `Y` 허가 받았음 (바로 사용 가능)
     * - `N` 허가받지 않았음. 사용하려면 저작권자에게 허가 받아야함.
     * @default N 허가받지 않은 상태
     */
    permissionYn?: 'Y' | 'N';
    /**
     * 저작권자
     */
    copyrt?: string;
    regId?: string;
    regDt?: string;
    modId?: string;
    modDt?: string;
    delId?: string;
    delDt?: string;
    hashcode: string;
    /**
     * 인물 사진 여부
     * @default N
     */
    peopleYn?: 'Y' | 'N';
    /**
     * 인물 사진일 경우 인물 유형
     * - `00` 상반신
     * - `01` 전신
     * - `02` 하반신
     */
    peopleType?: '00' | '01' | '02';
  }

  /**
   * 영상 컨텐츠
   */
  export interface IContVideo {
    contId: number;
    contType: ContType;
    /**
     * 컨텐츠의 서비스 상태
     * - `00` 중지됨
     * - `01` 서비스 중
     * - `99` 삭제됨
     * @default 00
     */
    serviceStatus: '00' | '01' | '99';
    title: string;
    media: number;
    source: number;
    department?: number;
    /**
     * 아카이빙 상태
     * - `00` : 아카이브 등록 전
     * - `01` : 검토 중
     * - `99` : 아카이브 등록 완료
     * @default 00
     */
    archStatus: '00' | '01' | '99';
    caption?: string;
    keyword?: string;
    /**
     * 촬영일
     */
    shootDt: string;
    /**
     * 촬영 장소
     */
    shootPlace: string;
    /**
     * 촬영 유형
     * - `00` 일반
     * - `01` 위성
     * - `02` 수중
     * - `99` 기타
     * @default 00
     */
    shootType?: '00' | '01' | '02' | '99';
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
     * - `Y` 허가 받았음 (바로 사용 가능)
     * - `N` 허가받지 않았음. 사용하려면 저작권자에게 허가 받아야함.
     * @default N 허가받지 않은 상태
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
    /**
     * 영상 타입
     * - `00` 자체 영상
     * - `01` 유튜브 영상
     * @default 00
     */
    mediaType: '00' | '01';
    /**
     * 영상 포맷
     */
    format?: string;
    fileSize: number;
    fileName: string;
    /**
     * 영상 재생 경로, 유튜브 영상인 경우 유튜브 iframe src
     */
    filePath: string;
    orgFileName: string;
    /**
     * 영상 썸네일 경로
     */
    thumbFilePath: string;
  }

  /**
   * 관련 타입
   */
  export type RelationType = IContPhoto | IContVideo;
}
