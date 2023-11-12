import { useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import LoadingOverlay from '../../../elements/common/LoadingOverlay/LoadingOverlay';
import { DashboardLayout } from '../../../../features/dashboard';
import { useGetTemplates } from '../../../../features/workSession';
import TemplateListItem from './TemplateListItem';
import PageButton from './PageButton';
import { MainContainer } from '../styles/sharedStyles';
import { getWebRoute } from '../../../../routes/web';
import { useAppSelector } from '../../../../stores/hooks';
import { selectLoggedInUser } from '../../../../stores/slices/authSlice';
import { getUserLoginCookie } from '../../../../utils/cookie/auth';
import { useDeleteTemplate } from '../../../../features/dashboard/api/hooks/useDeleteTemplate';
import { useAnyTrue } from '../../../../hooks/useAnyTrue';
import { showToast } from '../../../../libs/react-toastify/toast';
import { queryClient } from '../../../../libs/reactQuery/reactQuery';
import { getTemplatesQueryKey } from '../../../../features/workSession/api/hooks/useGetTemplates';

const NextPrevContainerDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.3em;
`;

const TemplateListPage = () => {
  const user = useAppSelector(selectLoggedInUser);
  const authToken = getUserLoginCookie();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limitInPage = 5;

  const {
    data,
    isLoading: isFetchingTemplates,
    isPreviousData,
  } = useGetTemplates(
    authToken,
    user?.id,
    currentPage,
    limitInPage,
    {
      enabled: Boolean(user),
      keepPreviousData: true,
    }
  );

  const {
    mutate: deleteTemplate,
    isLoading: isDeletingTemplate,
  } = useDeleteTemplate();

  /**
   * Delete button onClick
   *
   * @param {number} templateId
   */
  const handleDelete = async (templateId: number) => {
    await deleteTemplate({ authToken, userId: user.id, templateId }, {
      onError: () => {
        showToast('error', 'Failed to delete a template.');
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getTemplatesQueryKey(authToken, currentPage, limitInPage),
        });
      },
    });
  };

  const isLoading = useAnyTrue([
    isFetchingTemplates,
    isDeletingTemplate,
  ]);

  return (
    <DashboardLayout backButtonHref={getWebRoute('dashboard')}>
      <LoadingOverlay loading={isLoading} />
      <MainContainer>
        <h1>Templates</h1>
        <ul>
          {data?.templates.map(template =>
            <TemplateListItem
              key={template.id}
              templateId={template.id}
              name={template.name}
              deleteAction={handleDelete}
            />
          )}
        </ul>
        <NextPrevContainerDiv>
          <PageButton
            onClick={
              () => setCurrentPage((old) => Math.max(old - 1, 0))
            }
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </PageButton>
          <PageButton
            onClick={() => {
              setCurrentPage((old) => (data?.hasMore ? old + 1 : old))
            }}
            disabled={isPreviousData || !data?.hasMore}
          >
            <FiChevronRight />
          </PageButton>
        </NextPrevContainerDiv>
      </MainContainer>
    </DashboardLayout>
  );
};

export default TemplateListPage;
