/**
 * Null 타입 제거
 */
export type RemoveNullType<T> = {
  [P in keyof T]-?: Exclude<T[P], null>;
};

/**
 * Null -> Undefined 대체
 */
export type ReplaceNullToUndefined<T> = {
  [P in keyof T]-?: Exclude<T[P], null> | undefined;
};
