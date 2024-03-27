import { CodeGroupType } from 'archive-types';
import { ICode } from '@types';

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
