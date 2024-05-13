import { createPool, RowDataPacket, ResultSetHeader } from 'mysql2';
import { camelCase, mapKeys } from 'lodash';

let pool = createPool({
  host: process.env.NEXT_PUBLIC_DB_HOST || '',
  user: process.env.NEXT_PUBLIC_DB_USER || '',
  password: process.env.NEXT_PUBLIC_DB_PASSWORD || '',
  database: process.env.NEXT_PUBLIC_DB_NAME || '',
  port: Number(process.env.NEXT_PUBLIC_DB_PORT || 3306),
});

/**
 * key를 카멜표기법으로 변경
 * @param obj object
 * @returns 카멜로 변경한 obj
 */
function objectToCamelCase(obj: any) {
  return mapKeys(obj, (v, k: string) => camelCase(k));
}

const runConnectionError = (
  err: NodeJS.ErrnoException,
  callback?: () => void,
) => {
  const dt = new Date();

  console.groupCollapsed(`[Fail To Connect] ${dt}`);
  console.log(err);
  console.groupEnd();

  if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ENOTFOUND') {
    pool = createPool({
      host: process.env.NEXT_PUBLIC_DB_HOST || '',
      user: process.env.NEXT_PUBLIC_DB_USER || '',
      password: process.env.NEXT_PUBLIC_DB_PASSWORD || '',
      database: process.env.NEXT_PUBLIC_DB_NAME || '',
      port: Number(process.env.NEXT_PUBLIC_DB_PORT || 3306),
    });

    setTimeout(() => {
      callback?.();
    }, 5000);
  }
};

/**
 * select
 * @param query query
 * @returns Promise<T[]>
 */
export const select = <T>(query: string): Promise<T[]> =>
  new Promise((resolve, reject) => {
    const dt = new Date();

    pool.getConnection((err, conn) => {
      if (err) {
        runConnectionError(err, () => select(query));
        reject(err);
      } else if (conn) {
        try {
          conn.query<[(T & RowDataPacket)[], ResultSetHeader]>(
            query,
            (err, queryResult) => {
              if (err) {
                throw err;
              }

              console.groupCollapsed(`[Success To Execute Query] ${dt}`);
              console.log(`${query}`);
              console.groupEnd();
              resolve(queryResult.map(objectToCamelCase).map<T>((i) => i as T));
            },
          );
        } catch (inner) {
          console.groupCollapsed(`[Fail To Execute Query] ${dt}`);
          console.log(`${query}`);
          console.groupEnd();
          reject(inner);
        } finally {
          conn.release();
        }
      }
    });
  });

/**
 * execute query (not select)
 * @param query query
 * @param values
 * @returns Promise<ResultSetHeader>
 */
export const execute = (
  query: string,
  values?: any,
): Promise<ResultSetHeader> =>
  new Promise((resolve, reject) => {
    const dt = new Date();

    pool.getConnection((err, conn) => {
      if (err) {
        runConnectionError(err, () => execute(query, values));
        reject(err);
      } else if (conn) {
        try {
          conn.query<ResultSetHeader>(query, values, (err, queryResult) => {
            if (err) {
              throw err;
            }

            console.groupCollapsed(`[Success To Execute Query] ${dt}`);
            console.log(`${query}`);
            console.groupEnd();
            resolve(queryResult);
          });
        } catch (inner) {
          console.groupCollapsed(`[Fail To Execute Query] ${dt}`);
          console.log(`${query}`);
          console.groupEnd();
          reject(inner);
        } finally {
          conn.release();
        }
      }
    });
  });

/**
 * Run transaction
 * @param queries 쿼리 목록
 * @returns Promise<boolean>
 */
export const transaction = (...queries: string[]): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const dt = new Date();

    pool.getConnection((err, conn) => {
      if (err) {
        runConnectionError(err, () => transaction(...queries));
        reject(err);
      } else if (conn) {
        try {
          conn.beginTransaction((err) => {
            if (err) {
              console.log(`[Fail To Start Transaction] ${dt}`);
              throw err;
            }
          });

          let success = true;

          queries.forEach((query) => {
            if (success) {
              conn.query(query, undefined, (err) => {
                if (err) {
                  success = false;
                  console.groupCollapsed(
                    `[Fail To Execute Query(Transaction)] ${dt}`,
                  );
                  console.log(`${query}`);
                  console.groupEnd();
                } else {
                  console.groupCollapsed(
                    `[Success To Execute Query(Transaction)] ${dt}`,
                  );
                  console.log(`${query}`);
                  console.groupEnd();
                }
              });
            }
          });

          if (success) {
            conn.commit((err) => {
              if (err) {
                console.log(`[Fail To Commit Transaction] ${dt}`);
                throw err;
              }
            });
            conn.release();
            resolve(true);
          } else {
            throw 'Fail To Execute Query(Transaction)';
          }
        } catch (inner) {
          conn.rollback((err) => {
            console.log(`[Fail To Rollback] ${dt}`);
            reject(err);
          });
          reject(inner);
        } finally {
          conn.release();
        }
      }
    });
  });

export default execute;
