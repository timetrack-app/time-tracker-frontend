import styled from 'styled-components';
import { Form, FormProps } from '../../../../components/elements/ReactHookForm';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2em;
` as typeof Form;

const ProfileForm = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
>(props: FormProps<TFormValues>) => (<StyledForm<TFormValues> {...props} />)

export default ProfileForm
