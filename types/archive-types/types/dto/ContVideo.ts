import { ICont } from "./Cont";

/**
 * 영상컨텐츠 타입
 */
export interface IContVideo extends ICont {
  /**
   * 영상 촬영일
   */
  shootDt: null | string;

  /**
   * 영상 촬영 장소
   */
  shootPlace: null | string;

  /**
   * 촬영 유형
   * - `00` 일반
   * - `01` 위성
   * - `02` 수중
   * - `99` 기타
   * @default "00"
   */
  shootType: null | "00" | "01" | "02" | "99";

  /**
   * 영상 타입
   * - `00` 자체 영상
   * - `01` 유튜브 영상
   * @default "00"
   */
  mediaType: null | "00" | "01";

  /**
   * 영상 포맷
   */
  format: null | string;

  /**
   * 영상 파일 사이즈
   * @default 0
   */
  fileSize: null | number;

  /**
   * 파일명 (경로상 파일명)
   */
  fileName: null | string;

  /**
   * 영상 재생 경로, 유튜브 영상인 경우 유튜브 iframe src
   */
  filePath: null | string;

  /**
   * 파일 원래 이름 (노출 이름)
   */
  orgFileName: null | string;

  /**
   * 영상 썸네일 경로
   */
  thumbFilePath: null | string;

  /**
   * 재생 시간을 초 단위로 입력
   * @default 0
   */
  duration: null | number;
}
