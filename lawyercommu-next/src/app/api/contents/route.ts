import { select } from '@/db/pool';
import { IContentsTableRow } from '@/types';

/**
 * 컨텐츠 목록
 * @see https://jeong-pro.tistory.com/244
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paramPage = Number(searchParams.get('page') ?? 1);
  const paramCount = Number(searchParams.get('count') ?? 20);
  const paramCateMain = Number(searchParams.get('m') ?? 0);
  const paramCateSeq = Number(searchParams.get('c') ?? 0);

  // const id = searchParams.get('id');
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY!,
  //   },
  // });
  // const product = await res.json();

  let success = false;
  let list: IContentsTableRow[] = [];

  const wherePhrase = [
    paramCateSeq > 0 && `where c.category_seq=${paramCateSeq}`,
    paramCateMain > 0 && `where cate.main=${paramCateMain}`,
  ]
    .filter(Boolean)
    .join('');

  await select<IContentsTableRow>(
    `select c.seq, c.title,
    case 
      when DATE(c.reg_dt) = CURDATE()
      then DATE_FORMAT(c.reg_dt, '%H:%i')
      else DATE_FORMAT(c.reg_dt, '%m-%d') end as reg_dt,
    cate.sub_name as sub_name
    from contents c inner join contents_category cate
    on c.category_seq = cate.seq ${wherePhrase}
    order by seq desc 
    limit ${(paramPage - 1) * paramCount}, ${paramCount};`,
  ).then((res) => {
    success = true;
    list = res;
  });

  let count = 0;
  await select<{
    cnt: number;
  }>(`
  select count(*) as cnt
  from contents c inner join contents_category cate
  on c.category_seq = cate.seq ${wherePhrase};`).then(
    (res) => {
      count = res[0]?.cnt || 0;
    },
    () => {
      success = false;
    },
  );

  return Response.json({
    header: {
      status: 200,
      success: true,
    },
    body: {
      list,
      count,
    },
  });
}
