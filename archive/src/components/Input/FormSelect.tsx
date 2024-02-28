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
  ...rest
}: {
  options?: {
    value: ValueType;
    label: string;
  }[];
} & SelectProps<ValueType>) => {
  return (
    <FormControl variant={variant} fullWidth>
      {label && <InputLabel id={`${id}-select-label`}>{label}</InputLabel>}
      <Select
        labelId={`${id}-select-label`}
        id={id}
        size="small"
        label={label}
        {...rest}
      >
        {options?.map((option, idx) => (
          <MenuItem
            key={`${id}-select-label-option-${idx}`}
            value={option.value as ValueType}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
