import { ReactNode } from 'react';

import {
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
} from 'react-hook-form';

// Reference:
// https://github.com/alan2207/bulletproof-react/blob/master/src/components/Form/Form.tsx

export type FormProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => ReactNode
  options?: UseFormProps<TFormValues>
  className?: string
  autocomplete?: string
};
