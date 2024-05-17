import { select } from '@/db/pool';
import { ICategory } from '@/types';

export async function GET(
  req: Request,
  { params }: { params: { seq: number } },
) {
  const { seq } = params;

  let success = false;
  let list: ICategory[] = [];
  let info: ICategory | null = null;

  await select<ICategory>(
    `select * from contents_category where seq=${seq};`,
  ).then((res) => {
    success = true;
    info = res[0]!;
  });

  if (success && info) {
    await select<ICategory>(
      `select * from contents_category where main=${(info as ICategory).main} order by seq asc;`,
    ).then(
      (res) => {
        list = res;
      },
      () => {
        success = false;
      },
    );
  }

  return Response.json({
    header: {
      status: success ? 200 : 500,
      success,
    },
    body: {
      list,
      count: list.length,
      info,
    },
  });
}
