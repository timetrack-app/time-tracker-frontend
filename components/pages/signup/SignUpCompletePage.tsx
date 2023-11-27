import styled from 'styled-components';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

const MainContainerDiv = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentsContainerDiv = styled.div`
  max-width: 50em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
`;

const MessageP = styled.p`
  font-size: 1.2em;
`;

const Icon = styled(MdOutlineMarkEmailRead)`
  font-size: 4em;
  color: ${({ theme }) => theme.colors.info};
`;

const SignUpCompletePage = () => {
  return (
    <MainContainerDiv>
      <ContentsContainerDiv>
        <Icon />
        <MessageP>
          Verification email has been sent! Please check your inbox.
        </MessageP>
      </ContentsContainerDiv>
    </MainContainerDiv>
  );
};

export default SignUpCompletePage;
