import Link from 'next/link';
import Button from '@/components/Button/Button';
import { IContentsTableRow, IPagingList, IRes, IParamsContents } from '@/types';
import Table from '@/components/Table/Table';
import Pagination from '@/components/Table/Pagination';

// * generic 컴포넌트를 dynamic하게 import하는 방법
// const Table = dynamic(() => import('@/components/Table/Table'), {
//   ssr: false,
// }) as <T extends {}>(props: TableProps<T>) => JSX.Element;

type PageData = {
  status: number;
} & IRes<IPagingList<IContentsTableRow>>;

// 모든 요청에서 호출된다.
async function getData(props: IParamsContents): Promise<PageData> {
  'use server';

  const { page, count } = props;

  // Fetch data from external API
  const response = await fetch(
    `http://localhost:3000/api/contents?page=${page}&count=${count}`,
    {
      cache: 'no-store',
    },
  );
  const data: Pick<PageData, 'header' | 'body'> = await response.json();

  // if (response.status !== 200) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }

  // Pass data to the page via props
  return {
    status: response.status,
    header: data.header,
    body: data.body,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { status, header, body } = await getData({
    page: Number(searchParams?.['page'] ?? 1),
    count: 20,
  });

  return (
    <main>
      <div data-desc="list" className="mb-1">
        {status === 200 && header.success && (
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
                path: 'contents',
              },
              {
                headerName: '날짜',
                field: 'regDt',
                width: '60px',
              },
            ]}
            idField="seq"
            rowDatas={body.list}
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
        totalCount={body.count}
        count={20}
      />
    </main>
  );
}
