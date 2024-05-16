import { select } from '@/db/pool';
import { IContentsTableRow } from '@/types';

/**
 * 페이징 정책 세우기
 * @see https://jeong-pro.tistory.com/244
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paramPage = Number(searchParams.get('page') ?? 1);
  const paramCount = Number(searchParams.get('count') ?? 20);

  // const id = searchParams.get('id');
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY!,
  //   },
  // });
  // const product = await res.json();
  const list = await select<IContentsTableRow>(
    `select contents.seq, contents.title,
    case 
      when DATE(contents.reg_dt) = CURDATE()
      then DATE_FORMAT(contents.reg_dt, '%H:%i')
      else DATE_FORMAT(contents.reg_dt, '%m-%d') end as reg_dt,
    contents_category.sub_name as sub_name
    from contents inner join contents_category
    on contents.category_seq = contents_category.seq
    order by seq desc 
    limit ${(paramPage - 1) * paramCount}, ${paramCount};`,
  );
  const count = await select<{ cnt: number }>(
    `select count(*) as cnt from contents;`,
  );

  return Response.json({
    header: {
      status: 200,
      success: true,
    },
    body: {
      list,
      count: count[0]?.cnt,
    },
  });
}