import React from 'react';
import { ReactDatePickerProps } from 'react-datepicker';
import { Box, Typography } from '@mui/material';

import DatePicker from './DatePicker';

/**
 * 범위 선택 2개를 하나로
 */
const DateRangePicker = (
  props: Pick<ReactDatePickerProps, 'startDate' | 'endDate' | 'disabled'> & {
    onChange: (dates: (Date | null)[]) => void;
  },
) => {
  const { onChange, startDate, endDate, disabled } = props;

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
      <Box width={130} flexShrink={0}>
        <DatePicker
          value={startDate || undefined}
          onChange={(date) => onChange([date, endDate || null])}
          disabled={disabled}
          startDate={startDate}
          endDate={endDate}
        />
      </Box>
      <Typography component="div" flexShrink={0}>
        -
      </Typography>
      <Box width={130} flexShrink={0}>
        <DatePicker
          value={endDate || undefined}
          onChange={(date) => onChange([startDate || null, date])}
          disabled={disabled}
          startDate={startDate}
          endDate={endDate}
        />
      </Box>
    </Box>
  );
};

export default DateRangePicker;
