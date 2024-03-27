/**
 * 원래 타입에서 바꾼 데이터 타입
 * 프론트에서는 null이 오지 않기 때문에 null을 제거한다.
 */

import * as orgTypes from 'archive-types';

export type ICode = orgTypes.RemoveNullType<orgTypes.ICode>;
export type IContPhoto = orgTypes.RemoveNullType<orgTypes.IContPhoto>;
export type IContVideo = orgTypes.RemoveNullType<orgTypes.IContVideo>;
export type IContAudio = orgTypes.RemoveNullType<orgTypes.IContAudio>;
export type IContText = orgTypes.RemoveNullType<orgTypes.IContTextJoinWriters>;
export type RelationType = IContPhoto | IContVideo | IContAudio | IContText;
