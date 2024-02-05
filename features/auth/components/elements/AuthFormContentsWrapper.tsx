import styled from 'styled-components';

import { breakPoint } from '../../../../const/styles/breakPoint';

const FormMainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;

  @media ${breakPoint.mobileL} {
    max-width: 24em;
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

const SubmitButtonWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em 0;

  @media ${breakPoint.tablet} {
    flex-direction: row;
  }
`;

type AuthFormLayoutProps = {
  button: JSX.Element
  children?: React.ReactNode
  footerContent?: React.ReactNode
};

/**
 * Wrapper component for login and registration form
 * Wraps input fields and submit button
 *
 * @param {AuthFormLayoutProps} { button, children }
 * @returns {JSX.Element}
 */
const AuthFormContentsWrapper = ({ button, children, footerContent }: AuthFormLayoutProps) => (
  <>
    <FormMainDiv>
      <FormFieldsDiv>
        {children}
      </FormFieldsDiv>

      <SubmitButtonWrapperDiv>
        {button}
      </SubmitButtonWrapperDiv>
    </FormMainDiv>
    <FooterDiv>
      {footerContent}
    </FooterDiv>
  </>
);

export default AuthFormContentsWrapper;
