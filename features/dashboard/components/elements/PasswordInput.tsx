import styled from 'styled-components';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { IconType } from 'react-icons';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { TextInput } from '../../../../components/elements/ReactHookForm';
import { stonewallGrey } from '../../../../const/styles/colors';

const InputContainer = styled.div`
  position: relative;
  height: 2.5em;
  margin-bottom: 1.5em;
`;

const PasswordToggle = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
`;

const createStyledIcon = (icon: IconType) => styled(icon)`
  font-size: 1.5em;
  color: ${stonewallGrey};
`;

const EyeIcon = createStyledIcon(AiOutlineEye);
const EyeInvisibleIcon = createStyledIcon(AiOutlineEyeInvisible);

type PasswordInputProps = {
  registration: Partial<UseFormRegisterReturn>
  isVisible: boolean
  iconOnClick: () => void
  error?: FieldError
  className?: string
};

const PasswordInput = ({
  registration,
  isVisible,
  iconOnClick,
  error,
  className,
}: PasswordInputProps) => (
  <InputContainer className={className}>
    <TextInput
      type={isVisible ? 'text' : 'password'}
      registration={registration}
      error={error}
    />
    <PasswordToggle onClick={iconOnClick} type="button">
      {isVisible ? <EyeInvisibleIcon /> : <EyeIcon />}
    </PasswordToggle>
  </InputContainer>
);

export default PasswordInput;