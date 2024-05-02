import { NextRequest, NextResponse } from 'next/server';
import { QueryError } from 'mysql2';
import { transaction } from '@/db/pool';

export async function OPTIONS(req: Request) {
  return Response.json({});
}

export async function POST(req: NextRequest) {
  const payload: {
    title: string;
    body: string;
  } = await req.json();
  // const ip = (req.headers.get('X-Forwarded-For') ?? '127.0.0.1').split(',')[0];
  const ip = req.ip ?? '127.0.0.1';

  let message = '';
  let success = false;

  await transaction(
    `insert into contents(title, user_seq, reg_dt, reg_ip, category_seq) values ('${payload.title}', 1, now(), '${ip}', 1);`,
    `insert into contents_body(body, contents_seq) values ('${payload.body}', (select seq from contents where user_seq=1 order by seq desc limit 1));`,
  ).then(
    () => {
      success = true;
    },
    (err: QueryError | string | null) => {
      success = false;

      if (typeof err === 'string') {
        message = err;
      } else if (err) {
        message = err.message;
      }
    },
  );

  return NextResponse.json({
    header: {
      status: 200,
      success,
    },
    body: success,
  });
}
