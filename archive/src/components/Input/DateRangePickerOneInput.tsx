/* eslint-disable react/prop-types */
import React from 'react';
import DatePicker, {
  registerLocale,
  ReactDatePickerProps,
} from 'react-datepicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ko } from 'date-fns/locale/ko';
import { PatternFormat } from 'react-number-format';
import { IconButton, TextField } from '@mui/material';
import { stringToDate } from 'utils/utils';

registerLocale('ko-KR', ko);

/**
 * 커스텀 인풋
 */
const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    value?: string;
    onToggle: () => void;
    onSet: (dates: (Date | null)[]) => void;
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
      format="####-##-## - ####-##-##"
      customInput={TextField}
      InputProps={{
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

        const matchStartDt = new RegExp(
          /^(\d{4}-\d{2}-\d{2})\s-(\s{5}-\s{2}-\s{2})$/,
        );
        const matchEndDt = new RegExp(
          /^(\d{4}-\d{2}-\d{2})\s-\s(\d{4}-\d{2}-\d{2})$/,
        );

        // 2024-01-01 -     -  -
        if (matchStartDt.test(text)) {
          // const startDt = text.replace(matchStartDt, '$1');
          // onSet([stringToDate(startDt), null]);
        } else if (
          // 2024-01-01 - 2024-01-01
          matchEndDt.test(text)
        ) {
          const startDt = text.replace(matchEndDt, '$1');
          const endDt = text.replace(matchEndDt, '$2');
          onSet([stringToDate(startDt), stringToDate(endDt)]);
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

CustomInput.displayName = 'CustomInput';

/**
 * 범위 선택
 */
const DateRangePickerOneInput = (
  props: Omit<
    ReactDatePickerProps,
    'locale' | 'selectsRange' | 'customInput' | 'onChange'
  > & {
    onChange: (dates: (Date | null)[]) => void;
  },
) => {
  const { onChange, startDate, endDate, ...datePickerProps } = props;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (endDate) {
      setOpen(false);
    }
  }, [endDate]);

  return (
    <DatePicker<true, false>
      open={open}
      icon={<CalendarMonthIcon fontSize="small" />}
      dateFormat="yyyy-MM-dd"
      locale="ko-KR"
      selectsRange
      // isClearable
      shouldCloseOnSelect={false}
      showPopperArrow={false}
      customInput={
        <CustomInput onToggle={() => setOpen((b) => !b)} onSet={onChange} />
      }
      placeholderText="yyyy-MM-dd - yyyy-MM-dd"
      startDate={startDate}
      endDate={endDate}
      onChange={(dates) => {
        onChange(dates);
      }}
      disabledKeyboardNavigation
      {...datePickerProps}
    />
  );
};

export default DateRangePickerOneInput;
