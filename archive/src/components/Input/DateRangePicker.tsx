/* eslint-disable react/prop-types */
import React from 'react';
import DatePicker, {
  registerLocale,
  ReactDatePickerCustomHeaderProps,
  ReactDatePickerProps,
} from 'react-datepicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ko } from 'date-fns/locale/ko';
import { PatternFormat } from 'react-number-format';
import { TextField } from '@mui/material';

registerLocale('ko-KR', ko);

/**
 * 커스텀 인풋
 */
const DateRangePickerInput = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    value?: string;
  }
>((props, ref): JSX.Element => {
  const {
    value,
    onChange,
    onClick,
    disabled,
    readOnly,
    placeholder,
    ...inputProps
  } = props;

  return (
    <PatternFormat
      inputRef={ref}
      format={'####-##-## ~ ####-##-##'}
      customInput={TextField}
      InputProps={{
        endAdornment: <CalendarMonthIcon fontSize="small" />,
      }}
      inputProps={inputProps}
      size="small"
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      onClick={onClick}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
    />
  );
});

DateRangePickerInput.displayName = 'DateRangePickerInput';

/**
 * 범위 선택
 */
const DateRangePicker = (
  props: Omit<
    ReactDatePickerProps,
    'locale' | 'selectsRange' | 'customInput' | 'onChange'
  > & {
    onChange: (dates: (Date | null)[]) => void;
  },
) => {
  const { onChange, ...datePickerProps } = props;

  return (
    <DatePicker<true, false>
      dateFormat="yyyy-MM-dd"
      locale="ko-KR"
      selectsRange
      isClearable
      customInput={<DateRangePickerInput />}
      placeholderText="검색시작일 - 검색종료일"
      onChange={(dates) => {
        onChange(dates);
      }}
      {...datePickerProps}
    />
  );
};

export default DateRangePicker;
