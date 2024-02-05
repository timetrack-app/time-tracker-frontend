import styled from 'styled-components';
import { ButtonPrimary } from '../../../../components/elements/common';

const StyledButtonPrimary = styled(ButtonPrimary)`
  width: 30%;
  height: 2em;
`;

type Props = {
  label: string
};

const SubmitButton = ({ label }: Props) => (
  <StyledButtonPrimary type="submit">
    <p>{label}</p>
  </StyledButtonPrimary>
);

export default SubmitButton;
