import Link from 'next/link';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { LuLayoutTemplate } from 'react-icons/lu'
import { useAppSelector } from '../../../stores/hooks';
import { selectColorTheme } from '../../../stores/slices/colorThemeSlice';
import { ContentsCard, Content } from '../../../features/dashboard';
import { getWebRoute } from '../../../routes/web';

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

const DashboardPage = () => {
  const currentColorThemeName = useAppSelector(selectColorTheme);

  // TODO: user info edit form page
  // TODO: template list page(with delete button)
  // TODO: template detail page(with delete button)

  return (
    <MainContainerDiv>
      <ContentsContainerDiv>
        <Header>
          <Link href={getWebRoute('home')}>
            <BackButtonDiv>
              <FiChevronLeft />
            </BackButtonDiv>
          </Link>
        </Header>

        <ContentsCard title='Account' colorThemeName={currentColorThemeName}>
          <Content title='Edit profile' href='#' icon={<FaUserAlt />} />
        </ContentsCard>

        <ContentsCard title='Application' colorThemeName={currentColorThemeName}>
          <Content title='Templates' href='#' icon={<LuLayoutTemplate />} />
        </ContentsCard>

      </ContentsContainerDiv>
    </MainContainerDiv>
  );
};

export default DashboardPage;
