import Link from 'next/link';
import Button from '@/components/Button/Button';

export default function Page() {
  return (
    <main>
      TEST
      <div>
        <Button>
          <Link href="/contents/add">게시글 등록</Link>
        </Button>
      </div>
    </main>
  );
}
