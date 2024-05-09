'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/layout.module.scss';

const Nav = () => {
  const pathname = usePathname() || '';

  return (
    <nav>
      <ul>
        <li
          className={clsx({
            [styles.active]: pathname.startsWith('/contents'),
          })}
        >
          <Link href="/contents">게시판</Link>
        </li>
        <li
          className={clsx({
            [styles.active]: pathname.startsWith('/practice'),
          })}
        >
          <Link href="/practice">타자 연습</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
