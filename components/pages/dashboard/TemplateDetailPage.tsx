import { DashboardLayout } from '../../../features/dashboard';
import { useGetTemplate } from '../../../features/dashboard/api/hooks/useGetTemplate';
import { getWebRoute } from '../../../routes/web';
import { useAppSelector } from '../../../stores/hooks';
import { selectLoggedInUser } from '../../../stores/slices/authSlice';
import { getUserLoginCookie } from '../../../utils/cookie/auth';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import { MainContainer } from './styles/sharedStyles';

type Props = {
  templateId: number
};

const TemplateDetailPage = ({ templateId }: Props) => {
  const user = useAppSelector(selectLoggedInUser);

  const {
    data: template,
    isLoading: isTemplateLoading,
  } = useGetTemplate(
    {
    authToken: getUserLoginCookie(),
    userId: user?.id,
    templateId,
    },
    {
      enabled: !!user,
    }
  );


  return (
    <DashboardLayout backButtonHref={getWebRoute('templateList')}>
      <LoadingOverlay loading={isTemplateLoading} />
      <MainContainer>
        <h1>{template.name}</h1>
        {/* TODO: contents of the template */}
        {/* TODO: delete button */}
      </MainContainer>
    </DashboardLayout>
  );
};

export default TemplateDetailPage;
