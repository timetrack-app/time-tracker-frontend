import styled from 'styled-components';

import { breakPoint } from '../../../../../../../../const/styles/breakPoint';

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

const ButtonWrapperContainerDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonsWrapperDiv = styled.div`
  width: 50%;
  height: 2.5em;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5em;
`;

type RenameTaskFormLayoutProps = {
  submitButton: JSX.Element;
  discardButton: JSX.Element;
  children?: React.ReactNode;
};

/**
 * Wrapper component for login and registration form
 * Wraps input fields and submit button
 *
 * @param {RenameTaskFormLayoutProps} { button, children }
 * @returns {JSX.Element}
 */
const RenameTaskFormContentsWrapper = ({
  submitButton,
  discardButton,
  children,
}: RenameTaskFormLayoutProps) => (
  <FormMainDiv>
    <FormFieldsDiv>{children}</FormFieldsDiv>
    <ButtonWrapperContainerDiv>
      <ButtonsWrapperDiv>
        {discardButton}
        {submitButton}
      </ButtonsWrapperDiv>
    </ButtonWrapperContainerDiv>
  </FormMainDiv>
);

export default RenameTaskFormContentsWrapper;
