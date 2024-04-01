import { isAfter } from "date-fns";
import { IContAudioParams } from "../params";
import { Cont, ICont } from "./Cont";

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

/**
 * 오디오컨텐츠
 * @extends Cont
 */
export class ContAudio extends Cont implements IContAudio {
  shootDt: string | null;
  shootPlace: string | null;
  shootType: "00" | "01" | "99" | "02" | null;
  mediaType: "00" | "01" | "99" | null;
  format: string | null;
  fileSize: number | null;
  fileName: string | null;
  filePath: string | null;
  orgFileName: string | null;
  thumbFilePath: string | null;
  duration: number | null;

  /**
   * @override constructor
   * @param params 선택 데이터
   */
  constructor(params?: Record<string, any>) {
    super("A", params);

    this.shootDt = params?.["shootDt"] || this.regDt;
    this.shootPlace = params?.["shootPlace"] || null;
    this.shootType = params?.["shootType"] || "00";
    this.mediaType = params?.["mediaType"] || "99";
    this.format = params?.["format"] || null;
    this.fileSize = params?.["fileSize"] || 0;
    this.fileName = params?.["fileName"] || null;
    this.filePath = params?.["filePath"] || null;
    this.orgFileName = params?.["orgFileName"] || null;
    this.thumbFilePath = params?.["thumbFilePath"] || null;
    this.duration = params?.["duration"] || 0;
  }

  /**
   * @override
   * @returns IContAudio
   */
  get(): IContAudio {
    return {
      ...super.get(),
      shootDt: this.shootDt,
      shootPlace: this.shootPlace,
      shootType: this.shootType,
      mediaType: this.mediaType,
      format: this.format,
      fileSize: this.fileSize,
      fileName: this.fileName,
      filePath: this.filePath,
      orgFileName: this.orgFileName,
      thumbFilePath: this.thumbFilePath,
      duration: this.duration,
    };
  }

  /**
   * 검색조건에 부합하는지 확인
   * @param params 오디오컨텐츠 검색 조건
   * @returns match 여부
   */
  public matchSearchParams(params: IContAudioParams): boolean {
    const { startDt, endDt, mediaType, shootType, keyword } = params;

    let match = true;

    if (this.regDt) {
      const date = super.parse(this.regDt);

      if (startDt) {
        match = match && isAfter(date, super.parse(`${startDt} 00:00:00`));
      }

      if (endDt) {
        match = match && isAfter(super.parse(`${endDt} 00:00:00`), date);
      }
    }

    if (mediaType && this.mediaType) {
      match = match && mediaType === this.mediaType;
    }

    if (shootType && this.shootType) {
      match = match && shootType === this.shootType;
    }

    if (keyword && this.title) {
      const reg = new RegExp(keyword, "ig");
      match = match && reg.test(this.title);
    }

    return match;
  }
}
