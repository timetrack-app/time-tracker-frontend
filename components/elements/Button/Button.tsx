import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

import { useColorTheme } from '../../../hooks/useColorTheme';

type StyledButtonProps = {
  color?: string
  borderColor?: string
  backgroundColor?: string
};

const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  color: ${(props) => props.color};
  font-size: 1.3em;
  border-radius: 48px;
  border: 1px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
`;

export type ButtonProps = {
  color?: string
  borderColor?: string
  backgroundColor?: string
  className?: string
  children?: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>;

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
const Button = ({
  type = 'button',
  color,
  borderColor,
  backgroundColor,
  className,
  children,
}: ButtonProps) => {
  const { getCurrentColorThemeStyle } = useColorTheme();
  const currentTheme = getCurrentColorThemeStyle();

  return (
    <StyledButton
      type={type}
      color={color || currentTheme.colors.text}
      borderColor={borderColor || currentTheme.colors.text}
      backgroundColor={backgroundColor || currentTheme.colors.background}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
