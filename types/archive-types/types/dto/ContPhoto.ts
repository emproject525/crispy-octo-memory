import { IContPhotoParams } from "../params";
import { ICont, Cont } from "./Cont";
import { isAfter } from "date-fns";

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

/**
 * 사진컨텐츠
 * @extends Cont
 */
export class ContPhoto extends Cont implements IContPhoto {
  imgType: "00" | "01" | "99" | "02" | "03" | null;
  format: string | null;
  width: number | null;
  height: number | null;
  dpi: number | null;
  meta: string | null;
  shootDt: string | null;
  shootPlace: string | null;
  shootType: "00" | "01" | "99" | "02" | null;
  fileSize: number | null;
  fileName: string | null;
  filePath: string | null;
  orgFileName: string | null;
  hashcode: string | null;
  peopleYn: "Y" | "N" | null;
  peopleType: "00" | "01" | "02" | null;

  /**
   * @override constructor
   * @param params 선택 데이터
   */
  constructor(params?: Record<string, any>) {
    super("P", params);

    this.imgType = params?.["imgType"] || "00";
    this.format = params?.["format"] || null;
    this.width = params?.["width"] || 0;
    this.height = params?.["height"] || 0;
    this.dpi = params?.["dpi"] || 72;
    this.meta = params?.["meta"] || null;
    this.shootDt = params?.["shootDt"] || this.regDt;
    this.shootPlace = params?.["shootPlace"] || null;
    this.shootType = params?.["shootType"] || "00";
    this.fileSize = params?.["fileSize"] || 0;
    this.fileName = params?.["fileName"] || null;
    this.filePath = params?.["filePath"] || null;
    this.orgFileName = params?.["orgFileName"] || null;
    this.hashcode = params?.["hashcode"] || null;
    this.peopleYn = params?.["peopleYn"] || "N";
    this.peopleType = params?.["peopleType"] || null;
  }

  /**
   * @override
   * @returns IContPhoto
   */
  get(): IContPhoto {
    return {
      ...super.get(),
      imgType: this.imgType,
      format: this.format,
      width: this.width,
      height: this.height,
      dpi: this.dpi,
      meta: this.meta,
      shootDt: this.shootDt,
      shootPlace: this.shootPlace,
      shootType: this.shootType,
      fileSize: this.fileSize,
      fileName: this.fileName,
      filePath: this.filePath,
      orgFileName: this.orgFileName,
      hashcode: this.hashcode,
      peopleYn: this.peopleYn,
      peopleType: this.peopleType,
    };
  }

  /**
   * 검색조건에 부합하는지 확인
   * @param params 사진컨텐츠 검색 조건
   * @returns match 여부
   */
  public matchSearchParams(params: IContPhotoParams): boolean {
    const { startDt, endDt, imgType, shootType, keyword } = params;

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

    if (imgType && this.imgType) {
      match = match && imgType === this.imgType;
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
