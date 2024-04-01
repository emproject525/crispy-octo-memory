import { ICont } from "./Cont";

/**
 * 오디오컨텐츠 타입
 */
export interface IContAudio extends ICont {
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
   * @default "00"
   */
  shootType: null | "00" | "01" | "02" | "99";

  /**
   * 오디오 타입
   * - `00` 음악
   * - `01` 인터뷰
   * - `99` 기타
   * @default "99"
   */
  mediaType: null | "00" | "01" | "99";

  /**
   * 오디오 포맷
   */
  format: null | string;

  /**
   * 오디오 파일 사이즈
   * @default 0
   */
  fileSize: null | number;

  /**
   * 파일명 (경로상 파일명)
   */
  fileName: null | string;

  /**
   * 파일 경로
   */
  filePath: null | string;

  /**
   * 파일 원래 이름 (노출 이름)
   */
  orgFileName: null | string;

  /**
   * 오디오 썸네일 경로
   */
  thumbFilePath: null | string;

  /**
   * 재생 시간을 초 단위로 입력
   * @default 0
   */
  duration: null | number;
}
