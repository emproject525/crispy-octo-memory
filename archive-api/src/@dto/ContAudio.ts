import { IContAudio, IContAudioParams } from 'archive-types';
import { Cont } from './Cont';
import { isAfter } from 'date-fns';
import { removeNulls } from 'utils';

/**
 * 오디오컨텐츠
 * @extends Cont
 */
export class ContAudio extends Cont implements IContAudio {
  shootDt: string | null;
  shootPlace: string | null;
  shootType: '00' | '01' | '99' | '02' | null;
  mediaType: '00' | '01' | '99' | null;
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
    super('A', params);

    this.shootDt = params?.['shootDt'] || this.regDt;
    this.shootPlace = params?.['shootPlace'] || null;
    this.shootType = params?.['shootType'] || '00';
    this.mediaType = params?.['mediaType'] || '99';
    this.format = params?.['format'] || null;
    this.fileSize = params?.['fileSize'] || 0;
    this.fileName = params?.['fileName'] || null;
    this.filePath = params?.['filePath'] || null;
    this.orgFileName = params?.['orgFileName'] || null;
    this.thumbFilePath = params?.['thumbFilePath'] || null;
    this.duration = params?.['duration'] || 0;
  }

  /**
   * @override
   * @returns IContAudio
   */
  get(): IContAudio {
    return removeNulls<IContAudio>({
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
      duration: this.duration
    });
  }

  /**
   * 검색조건에 부합하는지 확인
   * @param params 오디오컨텐츠 검색 조건
   * @returns match 여부
   */
  public matchSearchParams(params: IContAudioParams): boolean {
    const { startDt, endDt, mediaType, shootType, keyword } = params;

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

    if (mediaType && this.mediaType) {
      match = match && mediaType === this.mediaType;
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
