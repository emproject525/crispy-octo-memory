import { IRes } from 'archive-types';
import { IContVideo, IContVideoParams } from '@types';
import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil';
import * as api from 'api/video';
import { format, subMonths } from 'date-fns';

// 검색 조건
export const videoParamsState = atomFamily<
  IContVideoParams,
  Partial<Pick<IContVideoParams, 'size'>>
>({
  key: 'videoParamsState',
  default: (params) => ({
    size: params.size || 20,
    page: 1,
    startDt: subMonths(new Date(), 6),
    endDt: new Date(),
  }),
});

// 검색 결과의 목록
export const videoListState = atom<IContVideo[]>({
  key: 'videoListState',
  default: [],
});

// params 변경 => 영상 목록 조회
export const videoListResponse = selectorFamily<
  {
    header: IRes<IContVideo>['header'];
  } & Exclude<IRes<IContVideo>['body'], undefined>,
  Partial<Pick<IContVideoParams, 'size'>>
>({
  key: 'videoListResponse',
  get:
    (overrides) =>
    async ({ get }) => {
      const params = get(videoParamsState(overrides));
      const startDt = params.startDt
        ? format(params.startDt, 'yyyy-MM-dd')
        : undefined;
      const endDt = params.endDt
        ? format(params.endDt, 'yyyy-MM-dd')
        : undefined;
      const response = await api.getVideos({
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
        const before = get(videoListState);
        const params = get(videoParamsState(overrides));
        const newList = newValue.list.map((item) => ({
          ...item,
          thumbFilePath: !item.thumbFilePath?.startsWith('http')
            ? `http://localhost:8080${item.thumbFilePath}`
            : item.thumbFilePath,
        }));
        set(
          videoListState,
          params.page === 1 ? newList : [...before, ...newList],
        );
      }
    },
});
