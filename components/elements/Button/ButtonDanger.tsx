import styled from 'styled-components';

import Button, { ButtonProps } from './Button';

import { roseMadder, tartanRed } from '../../../const/styles/colors';

const StyledButton = styled(Button)`
  &:hover {
    border: 1px solid ${roseMadder};
    background-color: ${roseMadder};
  }

  &:active {
    border: 1px solid ${tartanRed};
    box-shadow:0 0 0 1px ${tartanRed} inset;
    background-color: ${roseMadder};
  }
`;

const ButtonDanger = (props: ButtonProps) => (<StyledButton {...props} />);

export default ButtonDanger;
