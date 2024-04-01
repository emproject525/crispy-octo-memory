/**
 * 컨텐츠 공통 검색조건
 */
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

/**
 * 사진컨텐츠 검색조건
 */
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

/**
 * 영상컨텐츠 검색조건
 */
export interface IContVideoParams extends IContParams {
  /**
   * 촬영 유형
   */
  shootType?: string;
  /**
   * 영상 타입
   */
  mediaType?: string;
}

/**
 * 오디오컨텐츠 검색조건
 */
export interface IContAudioParams extends IContParams {
  /**
   * 촬영 유형
   */
  shootType?: string;
  /**
   * 오디오 타입
   */
  mediaType?: string;
}

/**
 * 문서컨텐츠 검색조건
 */
export interface IContTextParams extends IContParams {
  /**
   * 문서 타입
   */
  textType?: string;
}
