import Link from 'next/link';
import styled from 'styled-components';
import { MdOutlineDoNotDisturbAlt } from 'react-icons/md';
import { Button } from '../components/elements/common';
import { getWebRoute } from '../routes/web';

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

const Icon = styled(MdOutlineDoNotDisturbAlt)`
  font-size: 4em;
`;

const CustomButton = styled(Button)`
  width: 40%;
  height: 2em;
  font-size: 1em;
`;

const CustomLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Custom404 = () => {
  return (
    <MainContainerDiv>
      <ContentsContainerDiv>
        <Icon />
        <MessageP>The page could not be found.</MessageP>
        <CustomButton>
          <CustomLink href={getWebRoute('home')}>Home</CustomLink>
        </CustomButton>
      </ContentsContainerDiv>
    </MainContainerDiv>
  );
};

export default Custom404;
