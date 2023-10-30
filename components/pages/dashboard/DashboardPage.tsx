import { FaEnvelope } from 'react-icons/fa';
import { LuLayoutTemplate } from 'react-icons/lu'
import { MdPassword } from 'react-icons/md';
import { useAppSelector } from '../../../stores/hooks';
import { selectColorTheme } from '../../../stores/slices/colorThemeSlice';
import { ContentsCard, Content } from '../../../features/dashboard';
import { getWebRoute } from '../../../routes/web';
import DashboardLayout from '../../../features/dashboard/components/layouts/DashboardLayout';

/**
 * Dashboard index
 *
 * @return {JSX.Element}
 */
const DashboardPage = () => {
  const currentColorThemeName = useAppSelector(selectColorTheme);

  // TODO: user info edit form page
  // TODO: template list page(with delete button)
  // TODO: template detail page(with delete button)

  return (
    <DashboardLayout backButtonHref={getWebRoute('home')}>
      <ContentsCard title='Account' colorThemeName={currentColorThemeName}>
        <Content
          title='E-mail'
          href={getWebRoute('editEmail')}
          icon={<FaEnvelope />}
        />
        <Content
          title='Password'
          href={getWebRoute('editPassword')}
          icon={<MdPassword />}
        />
      </ContentsCard>

      <ContentsCard title='Application' colorThemeName={currentColorThemeName}>
        <Content title='Templates' href='#' icon={<LuLayoutTemplate />} />
      </ContentsCard>
    </DashboardLayout>
  );
};

export default DashboardPage;
