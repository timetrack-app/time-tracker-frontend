import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

import FieldWrapper, { FieldWrapperPassThroughProps } from './FieldWrapper';

// Reference:
// https://github.com/alan2207/bulletproof-react/blob/master/src/components/Form/InputField.tsx

const Input = styled.input<{ isError: boolean }>`
  width: 100%;
  height: 2.5em;
  padding: 0.5em;
  appearance: none;
  outline: none;
  border: 1px solid ${({ theme, isError }) => (isError ? theme.colors.danger : theme.colors.border)};
  border-radius: 48px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.info};
  }
`;

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  placeholder?: string
  registration: Partial<UseFormRegisterReturn>;
};

const TextInput = (props: InputFieldProps) => {
  const {
    type = 'text',
    placeholder,
    label,
    registration,
    error,
    className,
  } = props;

  return (
    <FieldWrapper label={label} error={error} className={className}>
      <Input
        type={type}
        {...registration}
        isError={Boolean(error?.message)}
        placeholder={placeholder}
      />
    </FieldWrapper>
  );
};

export default TextInput;
