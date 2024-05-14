import { select } from '@/db/pool';
import { IContentsDetail } from '@/types';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { seq: number } },
) {
  const { seq } = params;

  let success = false;
  let body: IContentsDetail | null = null;

  await select<IContentsDetail>(
    `select 
    contents.seq, contents.title, contents.user_seq,
    DATE_FORMAT(contents.reg_dt, '%Y-%m-%d %H:%i') as reg_dt,
    DATE_FORMAT(contents.mod_dt, '%Y-%m-%d %H:%i') as mod_dt,
    contents_category.main_name as main_name,
    contents_category.sub_name as sub_name,
    contents_body.body as body,
    (select count(*) from comment where comment.contents_seq = ${seq} and parent_seq is NULL) as comment_cnt
    from contents
    inner join contents_category on contents.category_seq = contents_category.seq
    inner join contents_body on contents.seq = contents_body.contents_seq
    where contents.seq=${seq};
    `,
  ).then(
    (result) => {
      body = result[0];
      success = true;
    },
    () => {
      success = false;
    },
  );

  return Response.json({
    header: {
      status: success ? 200 : 500,
      success,
    },
    body,
  });
}
