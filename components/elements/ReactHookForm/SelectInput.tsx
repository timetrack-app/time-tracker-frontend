import styled from 'styled-components';
import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import FieldWrapper, { FieldWrapperPassThroughProps } from './FieldWrapper';

// Reference
// https://github.com/alan2207/bulletproof-react/blob/master/src/components/Form/SelectField.tsx

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string | number;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
};

const Select = styled.select`
  margin-top: 0.25rem;
  display: block;
  width: 100%;
  padding-left: 0.75rem;
  padding-right: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.info};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.info};
  }
`;

export const SelectInput = (props: SelectFieldProps) => {
  const { label, options, error, defaultValue, registration, placeholder } =
    props;
  return (
    <FieldWrapper label={label} error={error}>
      <Select
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </FieldWrapper>
  );
};
