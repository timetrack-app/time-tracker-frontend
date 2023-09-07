import { ReactNode } from 'react';

import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
} from 'react-hook-form';

// Reference:
// https://github.com/alan2207/bulletproof-react/blob/master/src/components/Form/Form.tsx

type FormProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => ReactNode
  options?: UseFormProps<TFormValues>
  className?: string
  autocomplete?: string
};

// TODO: styled-components
// const StyledForm = styled(Form)`...`;

const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
>({
    onSubmit,
    children,
    options,
    className,
    autocomplete = 'off',
  }: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ ...options });
  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className={className}
      autoComplete={autocomplete}
    >
      {children(methods)}
    </form>
  );
};

export default Form;
