import { IKeyword } from 'archive-types';

import client from './client';

/**
 * 최근 검색어 목록
 * @returns axios
 */
export const getLatestKeywords = () => {
  return client.get<IKeyword>('/api/latestkeywords');
};
