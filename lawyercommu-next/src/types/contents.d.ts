/**
 * ------------------------------------
 * 게시글, 카테고리, 게시글 본문, 댓글
 * `contents`
 * `contents_body`
 * `contents_category`
 * `comment`
 * ------------------------------------
 */

/**
 * `contents`
 */
export interface IContents {
  seq: number;
  title: string;
  userSeq?: number;
  regDt: string;
  regIp?: string;
  categorySeq?: number;
  delYn: 'Y' | 'N';
  delDt?: string;
  modDt?: string;
}

/**
 * `contents`
 * - `inner join contents_body on contents_seq`
 * - `inner join contents_category on category_seq`
 * - `inner join comment on contents_seq`
 */
export interface IContentsDetail extends IContents {
  body: string;
  mainName: string;
  subName: string;
  commentCnt: number;
}

/**
 * `contents`
 * - `inner join contents_category on category_seq`
 */
export interface IContentsTableRow {
  seq: number;
  title: string;
  regDt: string;
  // 카테고리의 sub_name
  subName: string;
}

/**
 * `comment`
 */
export interface IComment {
  seq: number;
  contentsSeq: number;
  userSeq: number;
  regDt: string;
  body: string;
  delYn: 'Y' | 'N';
  delDt?: string;
  parentSeq?: number;
}

/**
 * `comment`
 * - parent_seq is NULL
 */
export interface ICommentParent extends IComment {
  /**
   * 답글 갯수
   */
  replyCnt?: number;
  first?: number;
}

/**
 * `category`
 */
export interface ICategory {
  seq: number;
  main: number;
  sub: number;
  mainName: string;
  subName: string;
  regDt: string;
  modDt?: string;
  usedYn: 'Y' | 'N';
}
