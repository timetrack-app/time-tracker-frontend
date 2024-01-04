import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type StyledButtonProps = {
  height?: number;
  className?: string;
};

const StyledButton = styled.button<StyledButtonProps>`
  min-width: 100px;
  height: ${(props) => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  font-size: 1em;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
`;

export type FloatingMenuButtonProps = {
  children?: React.ReactNode;
} & StyledButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Common button component
 *
 * @param {ButtonProps} {
 *   type = 'button',
 *   color,
 *   borderColor,
 *   backgroundColor,
 *   children,
 * }
 * @return {JSX.Element}
 */
const FloatingMenuButton = ({
  className,
  children,
  height = 36,
  ...props
}: FloatingMenuButtonProps) => {
  return (
    <StyledButton
      type="button"
      height={height}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default FloatingMenuButton;
