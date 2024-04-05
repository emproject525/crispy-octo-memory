import React from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from '@mui/material';
import { codeMap } from 'pages/rootState';
import FormSelect from 'components/Input/FormSelect';

/**
 * 검색 파라미터 > 영상 종류 (ContType = 'V')
 * @returns JSX.Element
 */
const VideoMediaType = ({
  disabled,
  value,
  onChange,
}: {
  /**
   * disabled
   */
  disabled?: boolean;
  /**
   * value (string)
   */
  value: string;
  /**
   * onChange
   * @param newValue 새 옵션 value
   * @returns void
   */
  onChange: (newValue: string) => void;
}) => {
  const constants = useRecoilValue(codeMap);

  return (
    <Box width={120} flexShrink={0}>
      <FormSelect
        id="VideoMediaType"
        name="VideoMediaType"
        variant="outlined"
        label="영상 종류"
        color="search"
        options={Object.keys(constants.VIDEO_MEDIA_TYPE).map((key) => ({
          value: key,
          label:
            constants.VIDEO_MEDIA_TYPE[
              key as keyof typeof constants.VIDEO_MEDIA_TYPE
            ],
        }))}
        disabled={disabled}
        value={value}
        onChange={(evt) => {
          onChange(evt.target.value);
        }}
      />
    </Box>
  );
};

export default VideoMediaType;
