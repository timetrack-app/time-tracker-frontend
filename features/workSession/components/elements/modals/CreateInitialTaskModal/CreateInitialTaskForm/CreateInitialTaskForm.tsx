import styled from 'styled-components';

import Form, {
  FormProps,
} from '../../../../../../../components/elements/ReactHookForm/Form';

const StyledForm = styled(Form)`
  width: 100%;
` as typeof Form;

/**
 * Styled Form component for login, registration page
 * (This is just a wrapper for Form)
 *
 * @template CreateInitialTaskFormValues
 * @param {FormProps<TFormValues>} props
 */
const CreateInitialTaskForm = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
>(
  props: FormProps<TFormValues>,
) => <StyledForm<TFormValues> {...props} />;

export default CreateInitialTaskForm;