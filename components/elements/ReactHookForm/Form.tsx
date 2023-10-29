import { useForm } from 'react-hook-form';
import { FormProps } from './types';

// Reference:
// https://github.com/alan2207/bulletproof-react/blob/master/src/components/Form/Form.tsx

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
