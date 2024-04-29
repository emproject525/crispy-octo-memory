import { IRes } from '@/types';
import client from './client';

export const postContent = (body: { title: string; body: string }) =>
  client.post<IRes<boolean>>(`/contents/add`, body);
