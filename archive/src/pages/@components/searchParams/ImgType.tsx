import React from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from '@mui/material';
import { constantsState } from 'pages/rootState';
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
  const constants = useRecoilValue(constantsState);

  return (
    <Box width={100} flexShrink={0}>
      <FormSelect
        id="imgType"
        name="imgType"
        variant="outlined"
        label="이미지 종류"
        color="search"
        options={Object.keys(constants.TEXT_TYPE).map((key) => ({
          value: key,
          label: constants.TEXT_TYPE[key as keyof typeof constants.TEXT_TYPE],
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
