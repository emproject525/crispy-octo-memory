import { getCodes } from 'api/code';
import { CodeGroupType, ICode } from 'dto';
import { selector } from 'recoil';

const codeMap: Record<CodeGroupType, ICode[]> = {
  IMG_TYPE: [],
  MEDIA: [],
  SOURCE: [],
  DEPARTMENT: [],
};

/**
 * 코드 데이터 조회
 */
export const asyncCodeMap = selector<typeof codeMap>({
  key: 'asyncCodeMap',
  get: async () => {
    const response = await getCodes();

    if (response.status === 200) {
      const { data } = response;

      if (data.header.success) {
        return data.body!;
      } else {
        return codeMap;
      }
    }

    return codeMap;
  },
});
