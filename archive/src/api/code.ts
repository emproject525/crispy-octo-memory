import { CodeGroupType, ICode } from 'dto';

import client from './client';

/**
 * 코드 전체
 * @returns axios
 */
export const getCodes = () => {
  return client.get<Record<CodeGroupType, ICode[]>, undefined, false>(
    '/api/codes',
  );
};
