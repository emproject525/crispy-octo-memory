import { getCodes } from 'api/code';
import { GroupType, ContType } from 'archive-types';
import { ICode } from '@types';
import { atom, DefaultValue, selector } from 'recoil';

/**
 * 상수
 */
export const codeMap = atom({
  key: 'codeMap',
  default: {
    IMG_TYPE: {
      '00': '일반',
      '01': '만화',
      '02': '일러스트',
      '03': '지도',
      '99': '기타',
    },
    SERVICE_STATUS: {
      '00': '중지됨',
      '01': '서비스 중',
      '99': '삭제됨',
    },
    ARCHIVE_STATUS: {
      '00': '아카이브 등록 전',
      '01': '검토 중',
      '99': '아카이브 등록 완료',
    },
    SHOOT_TYPE: {
      '00': '일반',
      '01': '위성',
      '02': '수중',
      '99': '기타',
    },
    PEOPLE_TYPE: {
      '00': '상반신',
      '01': '전신',
      '02': '하반신',
    },
    VIDEO_MEDIA_TYPE: {
      '00': '자체 영상',
      '01': '유튜브 영상',
    },
    AUDIO_MEDIA_TYPE: {
      '00': '음악',
      '01': '인터뷰',
      '99': '기타',
    },
    WRITER_STATUS: {
      '00': '재직',
      '01': '휴직',
      '99': '퇴사',
    },
    TEXT_TYPE: {
      '00': '기사',
      '01': '인터뷰',
      '99': '기타',
    },
  },
});

const defaultMap: Record<GroupType, ICode[]> = {
  MEDIA: [],
  SOURCE: [],
  DEPARTMENT: [],
  IMG_TYPE: [],
};

/**
 * 코드 데이터 조회
 */
export const serverCodeMap = selector<typeof defaultMap>({
  key: 'serverCodeMap',
  get: async () => {
    const response = await getCodes();

    if (response.status === 200) {
      const { data } = response;

      if (data.header.success) {
        return data.body!;
      } else {
        return defaultMap;
      }
    }

    return defaultMap;
  },
});

/**
 * 보고 있는 컨텐츠
 */
const viewingIds = atom<string[]>({
  key: 'viewing',
  default: [],
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (newValue instanceof DefaultValue) {
        } else {
          console.log(newValue);
        }
      });
    },
  ],
});

export const viewContent = selector<{
  contType: ContType;
  contId: number;
}>({
  key: 'viewContent',
  get: () => ({
    contType: 'P',
    contId: 0,
  }),
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
    } else {
      const id = `${newValue.contType}-${newValue.contId}`;
      const ids = get(viewingIds);
      if (ids.indexOf(id) < 0) {
        set(viewingIds, [...ids, id]);
      }
    }
  },
});

export const closeContent = selector<{
  contType: ContType;
  contId: number;
}>({
  key: 'closeContent',
  get: () => ({
    contType: 'P',
    contId: 0,
  }),
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
    } else {
      const id = `${newValue.contType}-${newValue.contId}`;
      const ids = [...get(viewingIds)];
      const idx = ids.indexOf(id);

      if (idx > -1) {
        ids.splice(idx);
      }

      set(viewingIds, [...ids]);
    }
  },
});
