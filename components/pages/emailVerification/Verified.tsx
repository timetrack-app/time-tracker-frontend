import Link from 'next/link';
import styled from 'styled-components';
import { LuCheckCircle } from 'react-icons/lu';
import { Button } from '../../elements/common';
import { getWebRoute } from '../../../routes/web';

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

const Icon = styled(LuCheckCircle)`
  font-size: 4em;
  color: ${({ theme }) => theme.colors.info};
`;

const CustomButton = styled(Button)`
  width: 40%;
  height: 2em;
  font-size: 1em;

  &:hover {
    opacity: 0.6;
  }
`;

const CustomLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Verified = () => {
  return (
    <MainContainerDiv>
      <ContentsContainerDiv>
        <Icon />
        <MessageP>
          Your email address was successfully verified.
        </MessageP>
        <CustomButton>
          <CustomLink href={getWebRoute('home')}>Home</CustomLink>
        </CustomButton>
      </ContentsContainerDiv>
    </MainContainerDiv>
  );
};

export default Verified;
