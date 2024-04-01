import { ContType, IRelation } from 'archive-types';

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
   * @param contType 컨텐츠 타입
   * @param contId 컨텐츠 ID
   * @param relContType 관련 컨텐츠의 타입
   * @param relContId 관련 컨텐츠의 ID
   */
  constructor(
    contType: ContType,
    contId: number,
    relContType: ContType,
    relContId: number
  ) {
    this.seq = new Date().getTime();
    this.contType = contType;
    this.contId = contId;
    this.relContType = relContType;
    this.relContId = relContId;
  }
}
