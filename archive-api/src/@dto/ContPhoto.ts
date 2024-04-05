import { IContPhoto, IContPhotoParams } from 'archive-types';
import { Cont } from './Cont';
import { isAfter } from 'date-fns';
import { removeNulls } from 'utils';

/**
 * 사진컨텐츠
 * @extends Cont
 */
export class ContPhoto extends Cont implements IContPhoto {
  imgType: '00' | '01' | '99' | '02' | '03' | null;
  format: string | null;
  width: number | null;
  height: number | null;
  dpi: number | null;
  meta: string | null;
  shootDt: string | null;
  shootPlace: string | null;
  shootType: '00' | '01' | '99' | '02' | null;
  fileSize: number | null;
  fileName: string | null;
  filePath: string | null;
  orgFileName: string | null;
  hashcode: string | null;
  peopleYn: 'Y' | 'N' | null;
  peopleType: '00' | '01' | '02' | null;

  /**
   * @override constructor
   * @param params 선택 데이터
   */
  constructor(params?: Record<string, any>) {
    super('P', params);

    this.imgType = params?.['imgType'] || '00';
    this.format = params?.['format'] || null;
    this.width = params?.['width'] || 0;
    this.height = params?.['height'] || 0;
    this.dpi = params?.['dpi'] || 72;
    this.meta = params?.['meta'] || null;
    this.shootDt = params?.['shootDt'] || this.regDt;
    this.shootPlace = params?.['shootPlace'] || null;
    this.shootType = params?.['shootType'] || '00';
    this.fileSize = params?.['fileSize'] || 0;
    this.fileName = params?.['fileName'] || null;
    this.filePath = params?.['filePath'] || null;
    this.orgFileName = params?.['orgFileName'] || null;
    this.hashcode = params?.['hashcode'] || null;
    this.peopleYn = params?.['peopleYn'] || 'N';
    this.peopleType = params?.['peopleType'] || null;
  }

  /**
   * @override
   * @returns IContPhoto
   */
  get(): IContPhoto {
    return removeNulls<IContPhoto>({
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
      peopleType: this.peopleType
    });
  }

  /**
   * 검색조건에 부합하는지 확인
   * @param params 사진컨텐츠 검색 조건
   * @returns match 여부
   */
  public matchSearchParams(params: IContPhotoParams): boolean {
    const { startDt, endDt, imgType, shootType, keyword } = params;

    let match = super.inService();

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
      const reg = new RegExp(keyword, 'ig');
      match = match && reg.test(this.title);
    } else if (keyword && !this.title) {
      match = false;
    }

    return match;
  }
}
