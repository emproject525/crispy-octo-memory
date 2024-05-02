import Link from 'next/link';
import dynamic from 'next/dynamic';
import Button from '@/components/Button/Button';
import { IContentsTableRow, IPagingList, IRes } from '@/types';
import Table from '@/components/Table/Table';

// * generic 컴포넌트를 dynamic하게 import하는 방법
// const Table = dynamic(() => import('@/components/Table/Table'), {
//   ssr: false,
// }) as <T extends {}>(props: TableProps<T>) => JSX.Element;

type PageData = {
  status: number;
} & IRes<IPagingList<IContentsTableRow>>;

// 모든 요청에서 호출된다.
async function getData(): Promise<PageData> {
  'use server';

  // Fetch data from external API
  const response = await fetch('http://localhost:3000/api/contents', {
    cache: 'no-store',
  });
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

export default async function Page() {
  const { status, header, body } = await getData();

  return (
    <main>
      <div>
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
      <div>
        <Link href="/contents/add">
          <Button>글 작성</Button>
        </Link>
      </div>
    </main>
  );
}
