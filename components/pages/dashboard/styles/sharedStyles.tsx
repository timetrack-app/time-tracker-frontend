import styled from 'styled-components';
import ButtonPrimary from '../../../elements/common/Button/ButtonPrimary';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5em;
  padding: 0 1.5em;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height:2em;
`;

export const SubmitButton = styled(ButtonPrimary)`
  width: 15%;
  padding: 0.75em;
`;
