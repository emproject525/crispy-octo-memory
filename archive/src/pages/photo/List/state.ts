import { IRes } from 'archive-types';
import * as api from 'api/photo';
import { IContPhoto, IContPhotoParams } from '@types';
import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil';
import { format, subMonths } from 'date-fns';

// 검색 조건
export const photoParamsState = atomFamily<
  IContPhotoParams,
  Partial<Pick<IContPhotoParams, 'size'>>
>({
  key: 'photoListParams',
  default: (params) => ({
    size: params.size || 30,
    page: 1,
    startDt: subMonths(new Date(), 6),
    endDt: new Date(),
  }),
});

// 검색 결과의 목록
export const photoListState = atom<IContPhoto[]>({
  key: 'photoListState',
  default: [],
});

// params 변경 => 사진 목록 조회
export const photoListResponse = selectorFamily<
  {
    header: IRes<IContPhoto>['header'];
  } & Exclude<IRes<IContPhoto>['body'], undefined>,
  Partial<Pick<IContPhotoParams, 'size'>>
>({
  key: 'photoListResponse',
  get:
    (overrides) =>
    async ({ get }) => {
      const params = get(photoParamsState(overrides));
      const startDt = params.startDt
        ? format(params.startDt, 'yyyy-MM-dd')
        : undefined;
      const endDt = params.endDt
        ? format(params.endDt, 'yyyy-MM-dd')
        : undefined;
      const response = await api.getPhotos({
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
        const before = get(photoListState);
        const params = get(photoParamsState(overrides));
        const newList = (newValue.list || []).map((item) => ({
          ...item,
          filePath: !item.filePath?.startsWith('http')
            ? `http://localhost:8080${item.filePath}`
            : item.filePath,
        }));
        set(
          photoListState,
          params.page === 1 ? newList : [...before, ...newList],
        );
      }
    },
});
