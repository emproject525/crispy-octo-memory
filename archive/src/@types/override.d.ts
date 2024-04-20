/**
 * --------------------------------------------------
 * 공통 타입 변경
 * 프론트에서는 null이 오지 않기 때문에 null을 제거한다.
 * --------------------------------------------------
 */

import * as orgTypes from 'archive-types';

// dto
export type ICode = orgTypes.RemoveNullType<orgTypes.ICode>;
export type IContPhoto = orgTypes.ReplaceNullToUndefined<orgTypes.IContPhoto>;
export type IContVideo = orgTypes.ReplaceNullToUndefined<orgTypes.IContVideo>;
export type IContAudio = orgTypes.ReplaceNullToUndefined<orgTypes.IContAudio>;
export type IContText =
  orgTypes.ReplaceNullToUndefined<orgTypes.IContTextJoinWriters>;
export type RelationType = IContPhoto | IContVideo | IContAudio | IContText;

// params
export type IContTextParams = Omit<
  orgTypes.IContTextParams,
  'startDt' | 'endDt'
> & {
  startDt?: Date;
  endDt?: Date;
};
export type IContPhotoParams = Omit<
  orgTypes.IContPhotoParams,
  'startDt' | 'endDt'
> & {
  startDt?: Date;
  endDt?: Date;
};
export type IContVideoParams = Omit<
  orgTypes.IContVideoParams,
  'startDt' | 'endDt'
> & {
  startDt?: Date;
  endDt?: Date;
};
export type IContAudioParams = Omit<
  orgTypes.IContAudioParams,
  'startDt' | 'endDt'
> & {
  startDt?: Date;
  endDt?: Date;
};
