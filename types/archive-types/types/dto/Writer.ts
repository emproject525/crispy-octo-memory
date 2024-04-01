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
