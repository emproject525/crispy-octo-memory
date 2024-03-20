import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const SingleInputDateRangePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}></LocalizationProvider>
  );
};

export default SingleInputDateRangePicker;
