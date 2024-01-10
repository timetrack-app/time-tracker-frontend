import styled from 'styled-components';
import { MdErrorOutline } from 'react-icons/md';

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

const Icon = styled(MdErrorOutline)`
  font-size: 4em;
  color: ${({ theme }) => theme.colors.danger};
`;

const Verified = () => {
  return (
    <MainContainerDiv>
      <ContentsContainerDiv>
        <Icon />
        <MessageP>
          Your email address could not be verified.
        </MessageP>
      </ContentsContainerDiv>
    </MainContainerDiv>
  );
};

export default Verified;
