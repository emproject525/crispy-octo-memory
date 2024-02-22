import { ContType } from 'dto';
import client from './client';

/**
 * 컨텐츠 다운로드
 * @param params contType, contId
 * @returns axios
 */
export const download = (params: { contType: ContType; contId: number }) => {
  return client.download(params);
};
