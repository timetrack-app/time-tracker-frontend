import styled from 'styled-components';

const FormMainDiv = styled.div`
  width: 100%;
  height: 100%;
  gap: 3em;
`;

const FormFieldsDiv = styled.div`
  height: 100%;
  padding: 1em;
`;

type CreateTaskFormLayoutProps = {
  children?: React.ReactNode;
};

/**
 * Wrapper component for create task form
 * Wraps input fields and submit button
 *
 * @param {CreateTaskFormLayoutProps} { button, children }
 * @returns {JSX.Element}
 */
const CreateTaskFormContentsWrapper = ({
  children,
}: CreateTaskFormLayoutProps) => (
  <FormMainDiv>
    <FormFieldsDiv>{children}</FormFieldsDiv>
  </FormMainDiv>
);

export default CreateTaskFormContentsWrapper;
