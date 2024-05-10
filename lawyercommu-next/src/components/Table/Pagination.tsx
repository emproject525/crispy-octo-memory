'use client';

import React, { HTMLAttributes, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';
import styles from '@/styles/table.module.scss';

export type PaginationProps = {
  /**
   * 전체 글 수
   */
  totalCount: number;
  /**
   * 한 페이지당 글 수
   */
  count: number;
  /**
   * 현재 페이지
   * @default 1
   */
  page: number;
  /**
   * 페이지 표출수
   */
  displayPage?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

/**
 * @see https://www.w3schools.com/css/css3_pagination.asp
 */
const Pagination = ({
  totalCount,
  count,
  page,
  displayPage = 10,
  className,
  ...rest
}: PaginationProps) => {
  const pathname = usePathname();
  const [pages, setPages] = useState({
    start: 1,
    end: 1,
    prev: 1,
    next: 1,
  });

  useEffect(() => {
    const totalPage = Math.ceil(totalCount / count);
    const start = Math.floor(page / count) * displayPage + 1;
    const end =
      start + displayPage > totalPage ? totalPage : start + displayPage;
    const prev = start === 1 ? start : start - displayPage;
    const next = end + displayPage > totalPage ? totalPage : end + displayPage;

    setPages({
      start,
      end,
      prev,
      next,
    });
  }, [totalCount, page, displayPage, count]);

  return (
    <div
      data-desc="pagination"
      className={clsx(styles['pagination_wrap'], className)}
      {...rest}
    >
      <ul className={styles['pagination']}>
        <li data-desc="prev">
          <Link
            href={`${pathname}?page=${pages.prev}`}
            className={clsx({
              [styles.disabled]: pages.prev === pages.start,
            })}
          >
            <FaAngleLeft />
          </Link>
        </li>
        {Array.from({ length: pages.end - pages.start + 1 }).map(
          (_value, idx) => (
            <li key={`pagination-${idx}`}>
              <Link
                href={`${pathname}?page=${idx + 1}`}
                className={clsx({
                  [styles.active]: idx + 1 === page,
                })}
              >
                {idx + 1}
              </Link>
            </li>
          ),
        )}
        <li data-desc="right">
          <Link
            href={`${pathname}?page=${pages.next}`}
            className={clsx({
              [styles.disabled]: pages.next === pages.end,
            })}
          >
            <FaAngleRight />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
