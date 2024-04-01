import {
  IContTextJoinWriters,
  IContPhoto,
  IContVideo,
  IContAudio,
  ContType,
} from ".";

/**
 * 관련 정보 타입
 */
export interface IRelation {
  /**
   * 일련 번호
   */
  readonly seq: number;

  /**
   * 컨텐츠 타입
   */
  contType: ContType;

  /**
   * 컨텐츠 ID
   */
  contId: number;

  /**
   * 관련 컨텐츠의 타입
   */
  relContType: ContType;

  /**
   * 관련 컨텐츠의 ID
   */
  relContId: number;
}

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

/**
 * 관련 타입
 */
export type RelationType =
  | IContPhoto
  | IContVideo
  | IContAudio
  | IContTextJoinWriters;

/**
 * 컨텐츠의 관련 데이터 상세
 */
export interface IRelationCont {
  contType: ContType;
  contId: number;
  relations: RelationType[];
}
