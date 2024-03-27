import { IContText } from '@types';
import { IContTextParams } from 'archive-types';

import client from './client';

/**
 * 문서 목록
 * @returns axios
 */
export const getTexts = (params: IContTextParams) => {
  return client.get<IContText>('/api/texts', {
    params,
  });
};

/**
 * 문서 상세
 * @param contId 컨텐츠ID
 * @returns axios
 */
export const getText = (contId: number) => {
  return client.get<IContText, IContText, false>(`/api/texts/${contId}`);
};
