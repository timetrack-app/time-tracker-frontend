import { ReactNode } from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';

// Reference:
// https://github.com/alan2207/bulletproof-react/blob/master/src/components/Form/FieldWrapper.tsx

const MainContainerDiv = styled.div`
  width: 100%;
`;

const LabelSpan = styled.span`
  display: block;
  margin-bottom: 0.5em;
`;

const ErrorMsgSpan = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`;

type FieldWrapperProps = {
  label?: string
  children: ReactNode
  error?: FieldError
  className?: string
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'children'>;

const FieldWrapper = (props: FieldWrapperProps) => {
  const {
    label,
    error,
    children,
    className,
  } = props;

  return (
    <MainContainerDiv className={className}>
      <label>
        <LabelSpan>{label}</LabelSpan>
        <div>{children}</div>
      </label>
      {error?.message && (
        <div>
          <ErrorMsgSpan>{error.message}</ErrorMsgSpan>
        </div>
      )}
    </MainContainerDiv>
  );
};

export default FieldWrapper;
