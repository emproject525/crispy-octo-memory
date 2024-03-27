import React from 'react';
import { Box, Button, TextField } from '@mui/material';

export type KeywordAttribute = {
  /**
   * 현재 입력값 리턴
   * @returns input value
   */
  getCurrentValue: () => string;
};

/**
 * 검색 파라미터 > 키워드
 * @returns JSX.Element
 */
const Keyword = React.forwardRef<
  KeywordAttribute,
  {
    /**
     * disabled
     */
    disabled?: boolean;
    /**
     * value
     */
    value?: string;
    /**
     * onChange
     * @param newValue 새로운 입력값
     * @returns void
     */
    onChange: (newValue: string) => void;
    /**
     * 검색 버튼 사용
     */
    useSearchButton?: boolean;
    /**
     * 검색 버튼 클릭 액션(when only useSearchButton is true)
     * @returns void
     */
    onSearch?: (keyword?: string) => void;
  }
>(({ disabled, value, onChange, useSearchButton, onSearch }, ref) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useImperativeHandle(
    ref,
    () => ({
      getCurrentValue: () => inputRef.current?.value || '',
    }),
    [],
  );

  return (
    <>
      <Box flex={1}>
        <TextField
          ref={inputRef}
          fullWidth
          name="keyword"
          id="keyword"
          size="small"
          variant="outlined"
          label="검색어"
          color="search"
          defaultValue={value}
          onKeyUp={(evt) => {
            if (evt.key === 'Enter') {
              onChange((evt.target as HTMLInputElement).value);
            }
          }}
          disabled={disabled}
        />
      </Box>
      {useSearchButton && (
        <Box flexShrink={0}>
          <Button
            variant="contained"
            color="search"
            onClick={() => onSearch?.(inputRef.current?.value || undefined)}
          >
            검색
          </Button>
        </Box>
      )}
    </>
  );
});

Keyword.displayName = 'Keyword';

export default Keyword;
