import { NextRequest } from 'next/server';
import execute, { select } from '@/db/pool';
import { ICommentParent } from '@/types';

/**
 * `OPTIONS`
 */
export async function OPTIONS(req: Request) {
  return Response.json({});
}

/**
 * `GET` 특정 컨텐츠의 댓글 목록
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { contentsSeq: number } },
) {
  const { contentsSeq } = params;
  const { searchParams } = new URL(req.url);
  const paramPage = Number(searchParams.get('page') ?? 1);
  const paramCount = 2;

  let success = false;
  let list: ICommentParent[] = [];

  // 사용할 때는 역순으로 사용하기
  await select<ICommentParent>(
    `select p.seq, p.contents_seq, p.user_seq, p.del_yn, p.del_dt, p.parent_seq,
    DATE_FORMAT(p.reg_dt, '%Y-%m-%d %H:%i') as reg_dt,
    case
      when p.del_yn = 'Y'
      then '삭제된 댓글입니다.'
      else p.body end as body,
    count (distinct c.seq) as reply_cnt
    from comment p
    left join comment as c on p.seq=c.parent_seq
    where p.contents_seq=${contentsSeq} and p.parent_seq is NULL
    group by p.seq
    order by p.seq desc
    limit ${(paramPage - 1) * paramCount}, ${paramCount};
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
    `select count(*) from comment where contents_seq=${contentsSeq} and parent_seq is NULL;`,
  ).then((result) => {
    count = result[0]?.count || 0;
  });

  const total = Math.ceil(count / paramCount);

  return Response.json({
    header: {
      status: 200,
      success,
    },
    body: {
      list,
      count,
      /**
       * 전체 페이지 수
       */
      total,
    },
  });
}

/**
 * `POST` 특정 컨텐츠에 댓글 추가
 * - 답글 등록
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { contentsSeq: number } },
) {
  const payload: {
    body: string;
    parentSeq?: number;
  } = await req.json();

  let success = false;

  await execute(
    `insert into comment(contents_seq, user_seq, reg_dt, body, parent_seq) values (${params.contentsSeq}, 1, now(), '${payload.body ?? ''}', ${payload.parentSeq ?? null});`,
  ).then(
    () => {
      success = true;
    },
    () => {
      success = false;
    },
  );

  return Response.json({
    header: {
      status: 200,
      success,
    },
    body: success,
  });
}
