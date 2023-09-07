import { UseFormRegisterReturn } from 'react-hook-form';

import FieldWrapper, { FieldWrapperPassThroughProps } from './FieldWrapper';

// Reference:
// https://github.com/alan2207/bulletproof-react/blob/master/src/components/Form/InputField.tsx

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

const TextInput = (props: InputFieldProps) => {
  const {
    type = 'text',
    label,
    registration,
    error,
  } = props;

  return (
    <FieldWrapper label={label} error={error}>
      <input type={type} {...registration} />
    </FieldWrapper>
  );
};

export default TextInput;
