'use client';

import React, { ThHTMLAttributes } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from '@/styles/table.module.scss';

export type TableProps<T extends Record<string, any>> = {
  caption?: React.ReactNode;
  fields: ({
    headerName: React.ReactNode;
    field: keyof T;
    ui?: 'small' | 'link';
    /**
     * - ui === 'link' 일 때 Link의 href로 사용
     * - 풀 path는 `${path}${T[idField]}`
     */
    path?: string;
    width?: React.CSSProperties['width'];
  } & Pick<ThHTMLAttributes<HTMLTableRowElement>, 'colSpan'>)[];
  idField: keyof T;
  /**
   * Row Datas
   */
  rowDatas?: T[];
  /**
   * When row clicked
   * @param clicked T
   * @returns void
   */
  onClickRow?: (clicked: T) => void;
};

/**
 * @see styles https://codepen.io/_fhdamd/pen/JRRRZX
 */
const Table = <T extends Record<string, any> = {}>(props: TableProps<T>) => {
  const { caption, fields, idField, onClickRow, rowDatas } = props;

  return (
    <table className={clsx(styles['table_latitude'])}>
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          {fields.map((column, idx) => (
            <th
              key={`thead-tr-${idx}`}
              colSpan={column.colSpan}
              style={{
                width: column.width,
              }}
            >
              <p>{column.headerName}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowDatas?.map((row, idx) => (
          <tr key={`tbody-tr-${idx}`}>
            {fields.map((column, columnIdx) => {
              const item = row[column.field];
              return (
                <td
                  key={`tbody-tr-${idx}-td-${columnIdx}`}
                  colSpan={column.colSpan}
                  className={clsx({
                    [styles['table_latitude_small']]: column.ui === 'small',
                    [styles['table_latitude_link']]: column.ui === 'link',
                  })}
                  style={{
                    width: column.width,
                  }}
                >
                  {column.ui === 'link' ? (
                    <Link
                      href={[column.path || '', row[idField] || ''].join('/')}
                    >
                      {item}
                    </Link>
                  ) : (
                    item
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
