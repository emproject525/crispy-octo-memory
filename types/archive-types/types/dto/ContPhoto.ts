import { ICont } from "./Cont";

/**
 * 사진컨텐츠 타입
 */
export interface IContPhoto extends ICont {
  /**
   * 이미지 종류
   * - `00` 일반
   * - `01` 만화
   * - `02` 일러스트
   * - `03` 지도
   * - `99` 기타
   * @default "00"
   */
  imgType: null | "00" | "01" | "02" | "03" | "99";

  /**
   * 사진 포맷
   */
  format: null | string;

  /**
   * 사진 가로 사이즈 (pixels)
   * @default 0
   */
  width: null | number;

  /**
   * 사진 세로 사이즈 (pixels)
   * @default 0
   */
  height: null | number;

  /**
   * 사진 dpi
   * @default 72
   */
  dpi: null | number;

  /**
   * 사진의 메타 정보 (json string)
   */
  meta: null | string;

  /**
   * 사진 촬영일
   */
  shootDt: null | string;

  /**
   * 사진 촬영 장소
   */
  shootPlace: null | string;

  /**
   * 사진 촬영 유형
   * - `00` 일반
   * - `01` 위성
   * - `02` 수중
   * - `99` 기타
   * @default "00"
   */
  shootType: null | "00" | "01" | "02" | "99";

  /**
   * 파일 사이즈
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
   * 사진의 hashcode
   */
  hashcode: null | string;

  /**
   * 인물 사진 여부
   * @default "N"
   */
  peopleYn: null | "Y" | "N";

  /**
   * 인물 사진일 경우 인물 유형
   * - `00` 상반신
   * - `01` 전신
   * - `02` 하반신
   */
  peopleType: null | "00" | "01" | "02";
}
