import { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import AuthGuard from '../../../../components/layouts/auth/AuthGuard';
import { FiChevronLeft } from 'react-icons/fi';

const MainContainerDiv = styled.div`
`;

const ContentsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2em;
  max-width: 50em;
  min-height: 50em;
  margin: 0px auto;
  padding: 32px 8px;
`;

const Header = styled.header`
  height: 6em;
  width: 100%;
  padding: 1em 0;
`;

const BackButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 2em;
  background-color: ${({ theme }) => theme.colors.background};
  width: 2em;
  height: 2em;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.componentBackground};
  }
`;

type Props = {
  backButtonHref: string
  children?: ReactNode
};

const DashboardLayout = ({ backButtonHref, children }: Props) => (
  <>
    <AuthGuard />
    <MainContainerDiv>
    <ContentsContainerDiv>
      <Header>
        <Link href={backButtonHref}>
          <BackButtonDiv>
            <FiChevronLeft />
          </BackButtonDiv>
        </Link>
      </Header>
      {children}
    </ContentsContainerDiv>
  </MainContainerDiv>
  </>
);

export default DashboardLayout;
