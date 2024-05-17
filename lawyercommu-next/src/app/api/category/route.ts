import { select } from '@/db/pool';
import { ICategory } from '@/types';

/**
 * 카테고리 목록
 * @param req
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const main = Number(searchParams.get('m') ?? 0);

  let success = false;
  let list: ICategory[] = [];

  await select<ICategory>(
    `select * from contents_category ${main > 0 ? ` where main=${main} ` : ''} order by seq asc;`,
  ).then((res) => {
    list = res;
    success = true;
  });

  return Response.json({
    header: {
      status: 200,
      success: true,
    },
    body: {
      list,
      count: list.length,
    },
  });
}
