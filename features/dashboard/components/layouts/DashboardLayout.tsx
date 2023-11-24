import { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';

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

// Cannot use this for PageComponent.getLayout pattern
// because the theme becomes undefined in SSR
// The template of this project is from styled-components example in official repo
// but theme is undefined in Layout components somehow.
// Tried to solve this problem but I couldn't.
const DashboardLayout = ({ backButtonHref, children }: Props) => (
  <div>
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
  </div>
);

export default DashboardLayout;
