import { IRes, IPagingList, IContents } from '@/types';
import client from './client';

export const getContents = () =>
  client.get<IRes<IPagingList<IContents>>>(`/contents`);

export const postContents = (body: { title: string; body: string }) =>
  client.post<IRes<boolean>>(`/contents/add`, body);
