/**
 * 작가 타입
 */
export interface IWriter {
  /**
   * 매체
   */
  media: null | number;
  /**
   * 출처
   */
  source: null | number;
  /**
   * 부서
   */
  department: null | number;
  /**
   * 작가 ID
   */
  readonly id: string;
  /**
   * 작가명
   */
  name: string;
  /**
   * 작가 EMAIL
   */
  email: null | string;
  /**
   * 상태
   * - `00` 재직 중
   * - `01` 휴직 중
   * - `99` 퇴사
   * @deafult "00"
   */
  status: null | "00" | "01" | "99";
}

/**
 * 작가
 */
export class Writer implements IWriter {
  media: number | null;
  source: number | null;
  department: number | null;
  id: string;
  name: string;
  email: string | null;
  status: "00" | "01" | "99" | null;

  /**
   *
   * @param id 작가 ID
   * @param name 작가명
   * @param params 선택 데이터
   */
  constructor(id: string, name: string, params?: Record<string, any>) {
    this.media = params?.["media"] || null;
    this.source = null;
    this.department = params?.["department"] || null;
    this.id = id;
    this.name = name;
    this.email = params?.["email"] || null;
    this.status = params?.["status"] || "00";
  }
}
