import styled from 'styled-components';

import Button, { ButtonProps } from './Button';

import { coralRed, petalBloom, roseMadder, tartanRed, translucentUnicorn } from '../../../../const/styles/colors';

const StyledButton = styled(Button)`
  border: 1px solid ${coralRed};
  color: ${coralRed};
  background-color: ${translucentUnicorn};

  &:hover {
    border: 1px solid ${roseMadder};
    background-color: ${petalBloom};
  }

  &:active {
    box-shadow: 0 0 0 1px ${roseMadder} inset;
  }
`;

const ButtonDanger = (props: ButtonProps) => <StyledButton {...props} />;

export default ButtonDanger;
