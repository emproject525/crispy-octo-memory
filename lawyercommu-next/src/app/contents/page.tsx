import Link from 'next/link';
import Button from '@/components/Button/Button';

export default function Page() {
  return (
    <main>
      TEST
      <div>
        <Link href="/contents/add">
          <Button>글 작성</Button>
        </Link>
      </div>
    </main>
  );
}
