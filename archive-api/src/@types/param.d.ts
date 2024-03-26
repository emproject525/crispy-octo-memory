declare module 'params' {
  export interface IContPhotoParams {
    size: number;
    page: number;
    keyword?: string;
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

  export interface IContTextParams {
    size: number;
    page: number;
    // 검색어
    keyword?: string;
    // 검색 시작일
    startDt?: string;
    // 검색 종료일
    endDt?: string;
    // 문서 타입
    textType?: string;
  }
}
