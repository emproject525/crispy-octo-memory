/* eslint-disable react/prop-types */
import React from 'react';
import OrgDatePicker, {
  registerLocale,
  ReactDatePickerCustomHeaderProps,
  ReactDatePickerProps,
} from 'react-datepicker';
import { PatternFormat } from 'react-number-format';
import { Box, IconButton, NativeSelect, TextField } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { stringToDate } from 'utils/utils';

registerLocale('ko-KR', ko);

/**
 * 커스텀 인풋
 */
const DatePickerInput = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    value?: string;
    onToggle: () => void;
    onSet: (date: Date | null) => void;
  }
>((props, ref): JSX.Element => {
  const {
    value,
    onSet,
    onClick,
    disabled,
    readOnly,
    placeholder,
    onToggle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange, // 제외
    ...inputProps
  } = props;

  return (
    <PatternFormat
      inputRef={ref}
      format="####-##-##"
      customInput={TextField}
      InputProps={{
        sx: {
          ...(disabled && {
            backgroundColor: 'rgba(118, 118, 118, 0.15)',
          }),
          'input[disabled]': {
            backgroundColor: 'transparent',
          },
        },
        endAdornment: (
          <IconButton
            title="달력 열기"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle();
            }}
            sx={{
              p: 0.5,
            }}
            disabled={disabled}
          >
            <CalendarMonthIcon fontSize="small" />
          </IconButton>
        ),
      }}
      inputProps={inputProps}
      size="small"
      variant="outlined"
      color="search"
      fullWidth
      value={value}
      onChange={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const text = e.target.value || '';

        const matchDt = new RegExp(/^(\d{4}-\d{2}-\d{2})$/);

        // 2024-01-01
        if (matchDt.test(text)) {
          const dt = text.replace(matchDt, '$1');
          onSet(stringToDate(dt));
        }
      }}
      onClick={(evt: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        evt.stopPropagation();
        evt.preventDefault();
        onClick?.(evt);
      }}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
    />
  );
});

DatePickerInput.displayName = 'DatePickerInput';

/**
 * 범위 선택
 */
const DatePicker = (
  props: Omit<
    ReactDatePickerProps,
    'locale' | 'selectsRange' | 'customInput' | 'onChange' | 'value'
  > & {
    value?: Date;
    onChange: (date: Date | null) => void;
  },
) => {
  const { onChange, value, startDate, endDate, ...datePickerProps } = props;
  const [open, setOpen] = React.useState(false);
  const years = Array.from(
    { length: 30 },
    (v, k) => new Date().getFullYear() + 5 - k,
  )
    .reverse()
    .map((y: number) => String(y));
  const months = Array.from({ length: 12 }, (v, k) => `${k + 1}월`);
  const getMonth = React.useCallback(
    (date: Date) => `${date.getMonth() + 1}월`,
    [],
  );

  return (
    <OrgDatePicker<false, false>
      open={open}
      icon={<CalendarMonthIcon fontSize="small" />}
      dateFormat="yyyy-MM-dd"
      locale="ko-KR"
      // isClearable
      shouldCloseOnSelect={false}
      showPopperArrow={false}
      customInput={
        <DatePickerInput onToggle={() => setOpen((b) => !b)} onSet={onChange} />
      }
      renderCustomHeader={({
        decreaseMonth,
        prevMonthButtonDisabled,
        date,
        changeYear,
        changeMonth,
        increaseMonth,
        nextMonthButtonDisabled,
      }: ReactDatePickerCustomHeaderProps) => (
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* 이전달 */}
          <IconButton
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            sx={{
              padding: 2,
              marginLeft: 2,
              '& .MuiSvgIcon-root': {
                width: '18px',
                height: '18px',
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Box position="relative" width={70}>
            <NativeSelect
              value={String(date.getFullYear() || '')}
              onChange={({ target: { value } }) => changeYear(Number(value))}
            >
              {(years || []).map((item) => (
                <option key={`year-${item}`} value={item}>
                  {item}
                </option>
              ))}
            </NativeSelect>
          </Box>

          <Box position="relative" width={70}>
            <NativeSelect
              value={getMonth(date)}
              onChange={({ target: { value } }) =>
                changeMonth((months || []).indexOf(value as string))
              }
            >
              {(months || []).map((item) => (
                <option key={`month-${item}`} value={item}>
                  {item}
                </option>
              ))}
            </NativeSelect>
          </Box>

          {/* 다음달 */}
          <IconButton
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            sx={{
              padding: 2,
              marginRight: 2,
              '& .MuiSvgIcon-root': {
                width: '18px',
                height: '18px',
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      )}
      placeholderText="yyyy-MM-dd"
      startDate={startDate}
      endDate={endDate}
      value={value ? format(value, 'yyyy-MM-dd') : undefined}
      onChange={onChange}
      disabledKeyboardNavigation
      {...datePickerProps}
    />
  );
};

export default DatePicker;
