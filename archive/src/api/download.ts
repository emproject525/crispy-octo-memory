import { AxiosRequestConfig } from 'axios';
import { ContType } from 'archive-types';
import client from './client';

/**
 * 컨텐츠 다운로드
 * @param params contType, contId
 * @returns axios
 */
export const download = (
  params: { contType: ContType; contId: number },
  config: undefined | AxiosRequestConfig,
) => {
  return client.download(params, config);
};
