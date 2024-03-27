interface IContParams {
  size: number;
  page: number;
  /**
   * 검색어
   */
  keyword?: string;
  /**
   * 검색 시작일
   */
  startDt?: string;
  /**
   * 검색 종료일
   */
  endDt?: string;
}

export interface IContPhotoParams extends IContParams {
  /**
   * 이미지 타입
   */
  imgType?: string;
  /**
   * 촬영 유형
   */
  shootType?: string;
}

export interface IContVideoParams {
  size: number;
  page: number;
  keyword?: string;
}

export interface IContAudioParams {
  size: number;
  page: number;
  keyword?: string;
}

export interface IContTextParams extends IContParams {
  /**
   * 문서 타입
   */
  textType?: string;
}
