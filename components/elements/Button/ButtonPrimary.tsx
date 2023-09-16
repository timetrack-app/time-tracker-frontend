import styled from 'styled-components';

import Button, { ButtonProps } from './Button';

import { mintFlash, softPetals, vegetation } from '../../../const/styles/colors';

const StyledButton = styled(Button)`
  &:hover {
    background-color: ${mintFlash};
  }

  &:active {
    box-shadow:0 0 0 1px ${vegetation} inset;
    background-color: ${mintFlash};
  }
`;

const ButtonPrimary = (props: ButtonProps) => (
  <StyledButton
    color={vegetation}
    backgroundColor={softPetals}
    borderColor={vegetation}
    {...props}
  />
);

export default ButtonPrimary;
