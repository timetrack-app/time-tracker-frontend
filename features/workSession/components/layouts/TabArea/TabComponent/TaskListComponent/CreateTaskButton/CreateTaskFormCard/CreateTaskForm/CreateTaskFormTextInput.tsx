import { InputHTMLAttributes, Ref, useEffect, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
// Reference:
// https://github.com/alan2207/bulletproof-react/blob/master/src/components/Form/InputField.tsx

const Input = styled.input`
  max-width: 100%;
  padding: 4px;
  appearance: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  border: none;
`;

type InputFieldProps = {
  registration: Partial<UseFormRegisterReturn>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const CreateTaskFormTextInput = (props: InputFieldProps) => {
  const { registration } = props;

  return <Input type="text" {...registration} {...props} />;
};

export default CreateTaskFormTextInput;
