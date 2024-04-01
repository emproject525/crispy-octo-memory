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
