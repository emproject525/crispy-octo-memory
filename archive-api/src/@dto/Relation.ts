import { ContType, IRelation } from 'archive-types';
import { removeNulls } from 'utils';

/**
 * 컨텐츠 간의 관련 정보
 */
export class Relation implements IRelation {
  seq: number;
  contType: ContType;
  contId: number;
  relContType: ContType;
  relContId: number;

  /**
   *
   * @param params 선택 데이터
   */
  constructor(params?: Record<string, any>) {
    this.seq = params?.['seq'] || new Date().getTime();
    this.contType = params?.['contType'] || 'P';
    this.contId = params?.['contId'] || 0;
    this.relContType = params?.['relContType'] || 'P';
    this.relContId = params?.['relContId'] || 0;
  }

  /**
   * 컨텐츠만 리턴
   * @returns IRelation
   */
  public get(): IRelation {
    return removeNulls<IRelation>({
      seq: this.seq,
      contType: this.contType,
      contId: this.contId,
      relContType: this.relContType,
      relContId: this.relContId
    });
  }

  /**
   * 컨텐츠와 관련된게 있는지 확인 (cont와 relCont 둘 중 아무거나)
   * @param contType ContType
   * @param contId number
   * @returns 연결 여부
   */
  public related(contType: ContType, contId: number): boolean {
    return (
      (this.contType === contType && String(this.contId) === String(contId)) ||
      (this.relContType === contType &&
        String(this.relContId) === String(contId))
    );
  }
}
