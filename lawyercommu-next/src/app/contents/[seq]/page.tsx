import { cache } from 'react';
import { RxSlash } from 'react-icons/rx';
import clsx from 'clsx';
import { Metadata, ResolvingMetadata } from 'next';
import { IContentsDetail, IRes } from '@/types';
import styles from '@/styles/contens.module.scss';

type PageData = {
  status: number;
} & IRes<IContentsDetail, true>;

type PageProps = {
  params: { seq: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

// 페이지 데이터 조회
const getData = cache(async (params: { seq: number }): Promise<PageData> => {
  'use server';

  const { seq } = params;

  // Fetch data from external API
  const response = await fetch(`http://localhost:3000/api/contents/${seq}`, {
    cache: 'no-store',
  });
  const data: Pick<PageData, 'header' | 'body'> = await response.json();

  return {
    status: response.status,
    header: data.header,
    body: data.body,
  };
});

// 메타
export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { status, header, body } = await getData(params);

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: header.success ? body?.title || '' : '잘못된 글입니다',
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

/**
 * @see https://react-icons.github.io/react-icons/ icon library
 */
export default async function Page({ params }: Pick<PageProps, 'params'>) {
  const { status, header, body } = await getData(params);

  return (
    <main>
      {status === 200 && header.success && (
        <div className={styles.detail}>
          <div className={clsx(styles.breadcrumb, 'mb-1')}>
            <span>{body?.mainName || ''}</span>
            <RxSlash />
            <span>{body?.subName || ''}</span>
          </div>
          <h1>{body?.title || ''}</h1>
          <hr className="my-2" />
          <div
            className={styles.contents_body}
            dangerouslySetInnerHTML={{
              __html: body?.body || '',
            }}
          />
          <hr className="my-2" />
        </div>
      )}
    </main>
  );
}
