import { NextRequest } from 'next/server';
import { select } from '@/db/pool';
import { IComment } from '@/types';

/**
 * `GET` 답글 목록
 * @param req
 * @param param1
 * @returns
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { seq: number } },
) {
  const { seq } = params;

  let success = false;
  let list: IComment[] = [];

  // TODO 더보기 구현
  await select<IComment>(
    `select seq, contents_seq, user_seq, del_yn, del_dt, parent_seq,
    DATE_FORMAT(reg_dt, '%Y-%m-%d %H:%i') as reg_dt,
    case
      when del_yn = 'Y'
      then '삭제된 댓글입니다.'
      else body end as body
    from comment
    where parent_seq=${seq}
    order by seq asc;
    `,
  ).then(
    (result) => {
      success = true;
      list = result;
    },
    () => {
      success = false;
    },
  );

  let count = 0;

  await select<{ count: number }>(
    `select count(*) from comment where parent_seq=${seq};`,
  ).then((result) => {
    count = result?.[0]?.['count'] || 0;
  });

  return Response.json({
    header: {
      status: 200,
      success,
    },
    body: {
      list,
      count,
    },
  });
}
