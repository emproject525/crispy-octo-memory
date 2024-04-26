import dynamic from 'next/dynamic';

const ContentsAdd = dynamic(() => import('@/pages/contentsAdd'), {
  ssr: false,
});

export default function Page() {
  return (
    <main>
      <ContentsAdd />
    </main>
  );
}
