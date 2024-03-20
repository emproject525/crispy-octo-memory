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
          list: T[];
          count: number;
          keywords: string[];
        }
      : T;
  }

  /**
   * 코드
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
   * 작가
   */
  export interface IWriter {
    media: number;
    source: null | number;
    department: number;
    id: string;
    name: string;
    email: null | string;
    /**
     * 상태
     * - `00` 재직 중
     * - `01` 휴직 중
     * - `99` 퇴사
     * @deafult 00
     */
    status: null | '00' | '01' | '99';
  }

  /**
   * 컨텐츠 타입
   * - `P` PHOTO 사진
   * - `T` TEXT 텍스트
   * - `V` VIDEO 비디오
   * - `A` AUDIO 오디오
   */
  export type ContType = 'P' | 'T' | 'V' | 'A';

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

  /**
   * 영상 컨텐츠
   */
  export interface IContVideo {
    contId: null | number;
    contType: null | ContType;
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
    /**
     * 영상 타입
     * - `00` 자체 영상
     * - `01` 유튜브 영상
     * @default 00
     */
    mediaType: null | '00' | '01';
    /**
     * 영상 포맷
     */
    format?: null | string;
    fileSize: null | number;
    fileName: null | string;
    /**
     * 영상 재생 경로, 유튜브 영상인 경우 유튜브 iframe src
     */
    filePath: null | string;
    orgFileName: null | string;
    /**
     * 영상 썸네일 경로
     */
    thumbFilePath: null | string;
    /**
     * 재생 시간을 초 단위로 입력
     */
    duration?: number;
  }

  /**
   * 오디오 컨텐츠
   */
  export interface IContAudio {
    contId: null | number;
    contType: null | ContType;
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
    /**
     * 오디오 타입
     * - `00` 음악
     * - `01` 인터뷰
     * - `99` 기타
     * @default 99
     */
    mediaType: null | '00' | '01' | '99';
    /**
     * 오디오 포맷
     */
    format?: null | string;
    fileSize: null | number;
    fileName: null | string;
    /**
     * 오디오 경로
     */
    filePath: null | string;
    orgFileName: null | string;
    /**
     * 오디오 썸네일 경로
     */
    thumbFilePath: null | string;
    /**
     * 재생 시간을 초 단위로 입력
     */
    duration?: number;
  }

  /**
   * 텍스트 컨텐츠
   */
  export interface IContText {
    contId: null | number;
    contType: null | ContType;
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
    writers: null | string[];
    /**
     * 아카이빙 상태
     * - `00` : 아카이브 등록 전
     * - `01` : 검토 중
     * - `99` : 아카이브 등록 완료
     * @default 00
     */
    archStatus: null | '00' | '01' | '99';
    subTitle: null | string;
    body: null | string;
    keyword?: null | string;
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
    /**
     * 문서 타입
     * - `00` 기사
     * - `01` 인터뷰
     * - `99` 기타
     * @default 99
     */
    textType: null | '00' | '01' | '99';
  }

  /**
   * 텍스트 컨텐츠 (writers -> 작가 데이터 조인)
   */
  export interface IResContText extends IContText {
    writers: null | IWriter[];
  }

  /**
   * 컨텐츠 간의 관련 정보
   */
  export interface IRelation {
    seq: number;
    contType: ContType;
    contId: number;
    relContType: ContType;
    relContId: number;
  }

  /**
   * 컨텐츠의 관련 데이터 상세
   */
  export interface IRelationCont {
    contType: ContType;
    contId: number;
    relations: (IContVideo | IContPhoto | IContAudio | IResContText)[];
  }
}
