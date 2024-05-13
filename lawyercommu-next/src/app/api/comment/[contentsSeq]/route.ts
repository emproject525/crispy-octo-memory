import { NextRequest } from 'next/server';
import execute, { select } from '@/db/pool';
import { IComment } from '@/types';

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
  const paramCount = 100;

  let success = false;
  let list: IComment[] = [];

  // 사용할 때는 역순으로 사용하기
  await select<IComment>(
    `select seq, contents_seq, user_seq, del_yn, del_dt, parent_seq,
    DATE_FORMAT(reg_dt, '%Y-%m-%d %H:%i') as reg_dt,
    case
      when del_yn = 'Y'
      then '삭제된 댓글입니다.'
      else body end as body
    from comment
    where contents_seq=${contentsSeq} & parent_seq is NULL
    order by seq desc
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

  return Response.json({
    header: {
      status: 200,
      success,
    },
    body: {
      list,
      count: 0,
    },
  });
}

/**
 * `POST` 특정 컨텐츠에 댓글 추가
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
