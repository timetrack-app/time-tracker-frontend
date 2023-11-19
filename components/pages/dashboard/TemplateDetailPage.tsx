import { useRouter } from 'next/router';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BsFillTrashFill } from 'react-icons/bs';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import { DashboardLayout, useGetTemplate, useDeleteTemplate } from '../../../features/dashboard';
import { getTemplatesQueryKey } from '../../../features/workSession';
import { MainContainer } from './styles/sharedStyles';
import { showToast } from '../../../libs/react-toastify/toast';
import { queryClient } from '../../../libs/reactQuery/reactQuery';
import { getWebRoute } from '../../../routes/web';
import { getUserLoginCookie } from '../../../utils/cookie/auth';
import { useAppSelector } from '../../../stores/hooks';
import { selectCurrentPage, selectLimit } from '../../../stores/slices/dashboardTemplatePaginationSlice';
import { selectLoggedInUser } from '../../../stores/slices/authSlice';
import { useAnyTrue } from '../../../hooks/useAnyTrue';

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  appearance: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  padding: 0;
  font-size: 1em;
  color: ${({ theme }) => theme.colors.danger};
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
`;

const TabContentsContainerDiv = styled.div`
  padding: 1.2em 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TabNameH2 = styled.h2`
  margin-bottom: 1em;
`;

const ListNameLi = styled.li`
  margin-bottom: 0.5em;
`;

type Props = {
  templateId: number
};

const TemplateDetailPage = ({ templateId }: Props) => {
  const router = useRouter();
  const authToken = getUserLoginCookie();
  const user = useAppSelector(selectLoggedInUser);
  const currentPageInTemplateList = useAppSelector(selectCurrentPage);
  const pageItemLimitInTemplateList = useAppSelector(selectLimit);

  const {
    data: template,
    isLoading: isTemplateLoading,
  } = useGetTemplate(
    { authToken, userId: user?.id, templateId },
    { enabled: !!user },
  );

  const {
    mutate: deleteTemplate,
    isLoading: isDeletingTemplate,
  } = useDeleteTemplate();

  const handleDelete = async () => {
    await deleteTemplate({ authToken, userId: user.id, templateId }, {
      onError: () => {
        showToast('error', 'Failed to delete a template.', { autoClose: 1200 });
      },
      onSuccess: () => {
        showToast('success', 'The template has been deleted.', { autoClose: 1200 });

        // invalidate the cache to fetch the latest template data
        queryClient.invalidateQueries({
          queryKey: getTemplatesQueryKey(
            authToken,
            currentPageInTemplateList,
            pageItemLimitInTemplateList,
          ),
        });

        toast.onChange((toastItem) => {
          if (toastItem.status === 'removed') {
            router.push(getWebRoute('templateList'));
          }
        });
      },
    });
  };

  const isLoading = useAnyTrue([
    isTemplateLoading,
    isDeletingTemplate,
  ]);

  return (
    <DashboardLayout backButtonHref={getWebRoute('templateList')}>
      <LoadingOverlay loading={isLoading} />
      <MainContainer>
        <HeaderDiv>
          <h1>{template?.name}</h1>
          <DeleteButton onClick={handleDelete}>
            <BsFillTrashFill />
          </DeleteButton>
        </HeaderDiv>
        <div>
          {template?.tabs.map((tab) =>
            <TabContentsContainerDiv key={tab.id}>
              <TabNameH2>{tab.name}</TabNameH2>
              <ul>
                {tab.lists.map((list) =>
                  <ListNameLi key={list.id}>{list.name}</ListNameLi>
                )}
              </ul>
            </TabContentsContainerDiv>,
          )}
        </div>
      </MainContainer>
    </DashboardLayout>
  );
};

export default TemplateDetailPage;
