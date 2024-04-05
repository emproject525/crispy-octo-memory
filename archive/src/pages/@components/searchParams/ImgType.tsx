import React from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from '@mui/material';
import { codeMap } from 'pages/rootState';
import FormSelect from 'components/Input/FormSelect';

/**
 * 검색 파라미터 > 이미지 종류
 * @returns JSX.Element
 */
const ImgType = ({
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
    <Box width={100} flexShrink={0}>
      <FormSelect
        id="imgType"
        name="imgType"
        variant="outlined"
        label="이미지 종류"
        color="search"
        options={Object.keys(constants.IMG_TYPE).map((key) => ({
          value: key,
          label: constants.IMG_TYPE[key as keyof typeof constants.IMG_TYPE],
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

export default ImgType;
