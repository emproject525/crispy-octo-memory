import { IRes } from 'archive-types';
import * as api from 'api/audio';
import { IContAudio, IContAudioParams } from '@types';
import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil';
import { format, subMonths } from 'date-fns';

// 검색 조건
export const audioParamsState = atomFamily<
  IContAudioParams,
  Partial<Pick<IContAudioParams, 'size'>>
>({
  key: 'audioParamsState',
  default: (params) => ({
    size: params.size || 20,
    page: 1,
    startDt: subMonths(new Date(), 6),
    endDt: new Date(),
  }),
});

// 검색 결과의 목록
export const audioListState = atom<IContAudio[]>({
  key: 'audioListState',
  default: [],
});

// params 변경 => 오디오 목록 조회
export const audioListResponse = selectorFamily<
  {
    header: IRes<IContAudio>['header'];
  } & Exclude<IRes<IContAudio>['body'], undefined>,
  Partial<Pick<IContAudioParams, 'size'>>
>({
  key: 'audioListResponse',
  get:
    (overrides) =>
    async ({ get }) => {
      const params = get(audioParamsState(overrides));
      const startDt = params.startDt
        ? format(params.startDt, 'yyyy-MM-dd')
        : undefined;
      const endDt = params.endDt
        ? format(params.endDt, 'yyyy-MM-dd')
        : undefined;
      const response = await api.getAudios({
        ...params,
        startDt,
        endDt,
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (response.status === 200 && response.data.header.success) {
        return {
          header: response.data.header,
          ...response.data.body!,
        };
      }

      return {
        header: response.data.header,
        list: [],
        count: 0,
        keywords: [],
      };
    },
  set:
    (overrides) =>
    ({ set, get }, newValue) => {
      if (newValue instanceof DefaultValue) {
      } else if (newValue.header.success) {
        const before = get(audioListState);
        const params = get(audioParamsState(overrides));
        const newList = newValue.list.map((item) => ({
          ...item,
          thumbFilePath: !item.thumbFilePath?.startsWith('http')
            ? `http://localhost:8080${item.thumbFilePath}`
            : item.thumbFilePath,
        }));
        set(
          audioListState,
          params.page === 1 ? newList : [...before, ...newList],
        );
      }
    },
});
