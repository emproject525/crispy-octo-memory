import { IRes } from '@/types';
import { NextRequest } from 'next/server';

export async function OPTIONS(req: Request) {
  return Response.json({});
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  console.log(data);
  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get('id');
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY!,
  //   },
  // });
  // const product = await res.json();

  return Response.json({
    header: {
      status: 200,
      success: true,
    },
    body: true,
  });
}
