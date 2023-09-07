import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

// Reference:
// https://github.com/alan2207/bulletproof-react/blob/master/src/components/Form/FieldWrapper.tsx

type FieldWrapperProps = {
  label?: string
  children: ReactNode
  error?: FieldError
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'children'>;

const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, children } = props;
  return (
    <div>
      <label>
        {label}
        <div>{children}</div>
      </label>
      {error?.message && (
        <div>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default FieldWrapper;
