import { getCodes } from 'api/code';
import { GroupType } from 'archive-types';
import { ICode } from '@types';
import { atom, selector } from 'recoil';

/**
 * 프론트 코드맵
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

/**
 * 서버 코드맵
 */
export const serverCodeMap = selector<Record<GroupType, ICode[]>>({
  key: 'serverCodeMap',
  get: async () => {
    const response = await getCodes();
    const defaultMap: Record<GroupType, ICode[]> = {
      MEDIA: [],
      SOURCE: [],
      DEPARTMENT: [],
      IMG_TYPE: [],
    };

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
