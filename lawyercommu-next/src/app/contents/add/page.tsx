import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';

const ContentsAdd = dynamic(() => import('@/containers/contentsAdd'), {
  ssr: false,
});

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// nextjs page 메타 설정 방법
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: '게시글 등록',
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

export default function Page() {
  return (
    <main
      style={{
        height: 'calc(100vh - 65px)',
      }}
    >
      <ContentsAdd />
    </main>
  );
}
