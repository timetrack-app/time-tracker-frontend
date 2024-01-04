import styled from 'styled-components';

import { breakPoint } from '../../../../../../../const/styles/breakPoint';

const FormMainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 0.5em;
  gap: 1em;
  @media ${breakPoint.tablet} {
    max-width: 35em;
    margin: 0 auto;
  }
`;

const FormFieldsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;

const ButtonsWrapperDiv = styled.div`
  width: 100%;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
`;

type RenameTabFormLayoutProps = {
  submitButton: JSX.Element;
  discardButton: JSX.Element;
  children?: React.ReactNode;
};

/**
 * Wrapper component for login and registration form
 * Wraps input fields and submit button
 *
 * @param {RenameTabFormLayoutProps} { button, children }
 * @returns {JSX.Element}
 */
const RenameTabFormContentsWrapper = ({
  submitButton,
  discardButton,
  children,
}: RenameTabFormLayoutProps) => (
  <FormMainDiv>
    <FormFieldsDiv>{children}</FormFieldsDiv>
    <ButtonsWrapperDiv>
      {discardButton}
      {submitButton}
    </ButtonsWrapperDiv>
  </FormMainDiv>
);

export default RenameTabFormContentsWrapper;
