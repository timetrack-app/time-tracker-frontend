import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background-color: transparent;
  border: none;
  transition: opacity 0.3s ease;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  color: ${({ theme }) => theme.colors.text};
`;

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ children, className, ...props }: IconButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default IconButton;
