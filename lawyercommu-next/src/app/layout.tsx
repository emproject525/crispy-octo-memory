import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { Noto_Sans_KR } from 'next/font/google';
import '@/styles/globals.scss';
import '@/styles/thirdparty.scss';
import styles from '@/styles/layout.module.scss';

const notosans = Noto_Sans_KR({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notosans.className}>
        <div className={styles.contents}>
          <header className={styles.header}>
            <a id="skip-nav" className={styles.skip_nav} href="#content">
              메뉴 건너뛰기
            </a>
            <div className={styles.header_area}>
              <div>HOME</div>
              <nav>
                <ul>
                  <li>
                    <Link href="/contents">게시판</Link>
                  </li>
                  <li>
                    <Link href="/practice">타자 연습</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <div id="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
