import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';

/**
 * 기본 Select
 */
const FormSelect = <ValueType extends string | number>({
  id,
  label,
  options,
  variant,
  color,
  ...rest
}: {
  options?: {
    value: ValueType;
    label: string;
  }[];
} & SelectProps<ValueType>) => {
  return (
    <FormControl color={color} variant={variant} fullWidth>
      {label && (
        <InputLabel size="small" id={`${id}-select-label`}>
          {label}
        </InputLabel>
      )}
      <Select
        labelId={`${id}-select-label`}
        id={id}
        size="small"
        label={label}
        MenuProps={{
          disableScrollLock: true,
          slotProps: {
            paper: {
              square: true,
              sx: {
                p: 0,
              },
            },
            root: {
              disablePortal: true,
            },
          },
        }}
        {...rest}
      >
        {label && (
          <MenuItem
            value=""
            sx={{
              fontSize: 12,
            }}
          >
            {label}
          </MenuItem>
        )}
        {options?.map((option, idx) => (
          <MenuItem
            key={`${id}-select-label-option-${idx}`}
            value={option.value as ValueType}
            sx={{
              fontSize: 12,
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
