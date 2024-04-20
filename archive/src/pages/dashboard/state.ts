import { IKeyword } from 'archive-types';
import { getLatestKeywords } from 'api/keywords';
import { atom, selector } from 'recoil';

// 최근 검색어
export const latestKeywordsState = atom<IKeyword[]>({
  key: 'latestKeywordsState',
  default: selector({
    key: 'latestKeywordsState/default',
    get: async () => {
      const response = await getLatestKeywords();

      if (response.status === 200 && response.data.header.success) {
        return response.data.body!.list;
      }

      return [];
    },
  }),
});
