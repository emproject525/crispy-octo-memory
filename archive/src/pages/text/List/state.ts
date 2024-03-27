import { IRes, IContTextParams } from 'archive-types';

import * as api from 'api/text';
import { IContText } from '@types';
import { format, subMonths } from 'date-fns';
import { atom, DefaultValue, selector } from 'recoil';

export const textListParams = atom<
  Omit<IContTextParams, 'startDt' | 'endDt'> & {
    startDt?: Date;
    endDt?: Date;
  }
>({
  key: 'textListParams',
  default: {
    size: 20,
    page: 1,
    startDt: subMonths(new Date(), 6),
    endDt: new Date(),
  },
});

export const textListState = atom<IContText[]>({
  key: 'textListState',
  default: [],
});

/**
 * params 변경 => 문서 목록 조회
 */
export const textListSelector = selector<IRes<IContText>>({
  key: 'textListSelector',
  get: async ({ get }) => {
    const params = get(textListParams);
    const startDt = params.startDt
      ? format(params.startDt, 'yyyy-MM-dd')
      : undefined;
    const endDt = params.endDt ? format(params.endDt, 'yyyy-MM-dd') : undefined;

    const response = await api.getTexts({
      ...params,
      startDt,
      endDt,
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (response.status === 200 && response.data.header.success) {
      return response.data;
    }

    throw true;
  },
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) {
    } else if (newValue.header.success) {
      const before = get(textListState);
      const params = get(textListParams);
      const newList = newValue.body!.list.map((item) => ({
        ...item,
      }));
      set(textListState, params.page === 1 ? newList : [...before, ...newList]);
    }
  },
});

/**
 * 체크한 목록
 */
export const checkedState = atom<IContText[]>({
  key: 'checkedState',
  default: [],
});

/**
 * 목록 전체를 체크했는지 확인
 */
export const isCheckedAll = selector<boolean>({
  key: 'isCheckedAll',
  get: ({ get }) => {
    const checked = get(checkedState);
    const allList = get(textListState);
    return checked.length > 0 && checked.length === allList.length;
  },
});

/**
 * 체크
 */
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