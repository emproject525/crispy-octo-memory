import Link from 'next/link';
import { RxDividerVertical } from 'react-icons/rx';
import Button from '@/components/Button/Button';
import { IContentsTableRow, IPagingList, IRes, ICategory } from '@/types';
import Table from '@/components/Table/Table';
import Pagination from '@/components/Table/Pagination';
import styles from '@/styles/contens.module.scss';
import FlexBox from '@/components/Box/FlexBox';
import Span from '@/components/Font/Span';

type PageData = {
  contents: { status: number } & IRes<IPagingList<IContentsTableRow>>;
  category: { status: number } & IRes<IPagingList<ICategory>>;
};

// 모든 요청에서 호출된다.
async function getData({
  page,
  count,
  c,
}: {
  page: number;
  count?: number;
  // 카테고리 번호
  c: number;
}): Promise<PageData> {
  'use server';

  const categoryResponse = await fetch(
    `http://localhost:3000/api/category/${c}`,
    {
      cache: 'default',
    },
  );
  const categoryData: IRes<
    { info: ICategory | null } & IPagingList<ICategory>
  > = await categoryResponse.json();

  // 카테고리 정보
  const cate = categoryData.body.info;

  // Fetch data from external API
  const contentsResponse = await fetch(
    cate?.sub === 1 // 전체 카테
      ? `http://localhost:3000/api/contents?page=${page}&count=${count}&m=${cate.main || 0}`
      : `http://localhost:3000/api/contents?page=${page}&count=${count}&c=${c}`,
    {
      cache: 'no-store',
    },
  );
  const contentsData: IRes<IPagingList<IContentsTableRow>> =
    await contentsResponse.json();

  // Pass data to the page via props
  return {
    contents: {
      status: contentsResponse.status,
      header: contentsData.header,
      body: contentsData.body,
    },
    category: {
      status: categoryResponse.status,
      header: categoryData.header,
      body: categoryData.body,
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { contents, category } = await getData({
    page: Number(searchParams?.['page'] ?? 1),
    count: 20,
    c: Number(params?.['seq'] ?? 0),
  });

  return (
    <main>
      <FlexBox
        className="mb-3"
        style={{
          columnGap: '1em',
        }}
      >
        <h1 className={styles.title}>
          {category.body.list[0]?.mainName || ''}
        </h1>
        <RxDividerVertical />
        <ul className={styles.category}>
          {category.body.list.map(({ seq, main, sub, subName }) => (
            <li key={`${main}-${sub}`}>
              <Link href={`/contents/c/${seq}`}>
                {params?.['seq'] === String(seq) ? (
                  <strong>
                    <Span>{subName}</Span>
                  </strong>
                ) : (
                  <Span>{subName}</Span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </FlexBox>
      <div data-desc="list" className="mb-1">
        {contents.status === 200 && contents.header.success && (
          <Table<IContentsTableRow>
            fields={[
              {
                headerName: '번호',
                field: 'seq',
                width: '60px',
              },
              {
                headerName: '카테고리',
                field: 'subName',
                ui: 'small',
                width: '80px',
              },
              {
                headerName: '제목',
                field: 'title',
                ui: 'link',
                path: '/contents',
              },
              {
                headerName: '날짜',
                field: 'regDt',
                width: '60px',
              },
            ]}
            idField="seq"
            rowDatas={contents.body.list}
          />
        )}
      </div>
      <div
        style={{
          textAlign: 'right',
        }}
      >
        <Link href="/contents/add">
          <Button>글 작성</Button>
        </Link>
      </div>
      <Pagination
        page={Number(searchParams?.['page'] ?? 1)}
        totalCount={contents.body.count}
        count={20}
      />
    </main>
  );
}
