import styled from 'styled-components';

import { breakPoint } from '../../../../../../../const/styles/breakPoint';

const FormMainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;

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
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type RenameListFormLayoutProps = {
  submitButton: JSX.Element;
  discardButton: JSX.Element;
  children?: React.ReactNode;
};

/**
 * Wrapper component for login and registration form
 * Wraps input fields and submit button
 *
 * @param {RenameListFormLayoutProps} { button, children }
 * @returns {JSX.Element}
 */
const RenameListFormContentsWrapper = ({
  submitButton,
  discardButton,
  children,
}: RenameListFormLayoutProps) => (
  <FormMainDiv>
    <FormFieldsDiv>{children}</FormFieldsDiv>
    <ButtonsWrapperDiv>
      {submitButton}
      {discardButton}
    </ButtonsWrapperDiv>
  </FormMainDiv>
);

export default RenameListFormContentsWrapper;
