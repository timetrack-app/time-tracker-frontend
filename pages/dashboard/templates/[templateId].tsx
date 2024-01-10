import { useRouter } from 'next/router';
import TemplateDetailPage from '../../../components/pages/dashboard/TemplateDetailPage';

const TemplateDetail = () => {
  const router = useRouter();
  const { templateId } = router.query;

  return <TemplateDetailPage templateId={Number(templateId)} />;
};

export default TemplateDetail;
