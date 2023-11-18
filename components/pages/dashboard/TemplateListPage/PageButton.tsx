import { ReactNode } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  appearance: none;
  background-color: ${({ theme }) => theme.colors.background};
  border: none;
  padding: 0;
  cursor: pointer;
  width: 1.5em;
  height: 1.5em;
  font-size: 1.5em;
  color: ${({ theme }) => theme.colors.text};

  &:disabled {
    color: ${({ theme }) => theme.colors.border};
    cursor: default;
  }
`;

type Props = {
  onClick: () => void
  disabled: boolean
  children?: ReactNode
};

const PageButton = ({ onClick, disabled, children }: Props) => (
  <Button onClick={onClick} disabled={disabled}>
    {children}
  </Button>
);

export default PageButton;
