import { IRes } from 'archive-types';

import * as api from 'api/text';
import { IContText, IContTextParams } from '@types';
import { format, subMonths } from 'date-fns';
import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';

// 검색 조건
export const textParamsState = atomFamily<
  IContTextParams,
  Partial<Pick<IContTextParams, 'size'>>
>({
  key: 'textParamsState',
  default: (params) => ({
    size: params.size || 20,
    page: 1,
    startDt: subMonths(new Date(), 6),
    endDt: new Date(),
  }),
});

// 검색 결과의 목록
export const textListState = atom<IContText[]>({
  key: 'textListState',
  default: [],
});

// params 변경 => 문서 목록 조회
export const textListResponse = selectorFamily<
  {
    header: IRes<IContText>['header'];
  } & Exclude<IRes<IContText>['body'], undefined>,
  Partial<Pick<IContTextParams, 'size'>>
>({
  key: 'textListResponse',
  get:
    (overrides) =>
    async ({ get }) => {
      const params = get(textParamsState(overrides));
      const startDt = params.startDt
        ? format(params.startDt, 'yyyy-MM-dd')
        : undefined;
      const endDt = params.endDt
        ? format(params.endDt, 'yyyy-MM-dd')
        : undefined;

      const response = await api.getTexts({
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
        const before = get(textListState);
        const params = get(textParamsState(overrides));
        const newList = newValue.list.map((item) => ({
          ...item,
        }));
        set(
          textListState,
          params.page === 1 ? newList : [...before, ...newList],
        );
      }
    },
});

// 체크한 목록
export const checkedState = atom<IContText[]>({
  key: 'checkedState',
  default: [],
});

// 목록 전체를 체크했는지 확인
export const isCheckedAll = selector<boolean>({
  key: 'isCheckedAll',
  get: ({ get }) => {
    const checked = get(checkedState);
    const allList = get(textListState);
    return checked.length > 0 && checked.length === allList.length;
  },
});

// 체크
export const checkTextOne = selector<undefined | IContText | 'all' | 'uncheck'>(
  {
    key: 'checkTextOne',
    get: () => {
      return undefined;
    },
    set: ({ get, set }, newValue) => {
      const before = get(checkedState);
      const allList = get(textListState);

      if (newValue instanceof DefaultValue) {
      } else if (newValue === 'all') {
        set(checkedState, allList);
      } else if (newValue === 'uncheck') {
        set(checkedState, []);
      } else if (newValue !== undefined) {
        const after: IContText[] = [...before];

        const exists = before.findIndex((i) => i.contId === newValue.contId);
        if (exists < 1) {
          after.push(newValue);
        } else {
          after.splice(exists, 1);
        }

        set(checkedState, after);
      }
    },
  },
);
