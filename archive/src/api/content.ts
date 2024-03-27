import { ContType } from 'archive-types';
import { RelationType } from '@types';
import client from './client';

/**
 * 컨텐츠의 관련 컨텐츠 조회
 * @returns axios
 */
export const getRelations = (params: {
  contType: ContType;
  contId: number;
}) => {
  return client.get<RelationType>('/api/relations', {
    params,
  });
};
