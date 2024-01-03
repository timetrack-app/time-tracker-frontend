import styled from 'styled-components';

import { breakPoint } from '../../../../../const/styles/breakPoint';

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

const SubmitButtonWrapperDiv = styled.div`
  width: 100%;
  height: 3em;
`;

type SelectInitialTaskFormLayoutProps = {
  button: JSX.Element;
  children?: React.ReactNode;
};

/**
 * Wrapper component for login and registration form
 * Wraps input fields and submit button
 *
 * @param {SelectInitialTaskFormLayoutProps} { button, children }
 * @returns {JSX.Element}
 */
const SelectInitialTaskFormContentsWrapper = ({
  button,
  children,
}: SelectInitialTaskFormLayoutProps) => (
  <FormMainDiv>
    <FormFieldsDiv>{children}</FormFieldsDiv>
    <SubmitButtonWrapperDiv>{button}</SubmitButtonWrapperDiv>
  </FormMainDiv>
);

export default SelectInitialTaskFormContentsWrapper;
