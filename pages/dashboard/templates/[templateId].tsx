import { useRouter } from 'next/router';
import TemplateDetailPage from '../../../components/pages/dashboard/TemplateDetailPage';

// TODO: Template detail page
// TODO: Can view all tabs and lists
// TODO: Can delete template from this page

const TemplateDetail = () => {
  const router = useRouter();
  const { templateId } = router.query;

  return <TemplateDetailPage templateId={Number(templateId)}  />;
};

export default TemplateDetail;
