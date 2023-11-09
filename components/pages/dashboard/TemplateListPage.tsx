import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import { DashboardLayout } from '../../../features/dashboard';
import { useGetTemplates } from '../../../features/workSession';
import { getWebRoute } from '../../../routes/web';
import { MainContainer } from './styles/sharedStyles';

const tmpResponse = {
  "templates": [
      {
          "id": 16,
          "userId": 1,
          "name": "Test template3",
          "createdAt": "2023-11-06T06:17:52.880Z",
          "updatedAt": "2023-11-06T06:17:52.880Z",
          "tabs": [
              {
                  "id": 7,
                  "templateId": 16,
                  "name": "Tab A3",
                  "displayOrder": 1,
                  "createdAt": "2023-11-06T06:17:52.880Z",
                  "updatedAt": "2023-11-06T06:17:52.880Z",
                  "lists": [
                      {
                          "id": 2,
                          "templateTabId": 7,
                          "name": "list13",
                          "displayOrder": 1,
                          "createdAt": "2023-11-06T06:17:52.880Z",
                          "updatedAt": "2023-11-06T06:17:52.880Z"
                      },
                      {
                          "id": 3,
                          "templateTabId": 7,
                          "name": "list23",
                          "displayOrder": 2,
                          "createdAt": "2023-11-06T06:17:52.880Z",
                          "updatedAt": "2023-11-06T06:17:52.880Z"
                      },
                      {
                          "id": 4,
                          "templateTabId": 7,
                          "name": "list33",
                          "displayOrder": 3,
                          "createdAt": "2023-11-06T06:17:52.880Z",
                          "updatedAt": "2023-11-06T06:17:52.880Z"
                      },
                      {
                          "id": 5,
                          "templateTabId": 7,
                          "name": "list43",
                          "displayOrder": 4,
                          "createdAt": "2023-11-06T06:17:52.880Z",
                          "updatedAt": "2023-11-06T06:17:52.880Z"
                      }
                  ]
              },
              {
                  "id": 8,
                  "templateId": 16,
                  "name": "Tab B3",
                  "displayOrder": 2,
                  "createdAt": "2023-11-06T06:17:52.880Z",
                  "updatedAt": "2023-11-06T06:17:52.880Z",
                  "lists": [
                      {
                          "id": 6,
                          "templateTabId": 8,
                          "name": "list1b3",
                          "displayOrder": 1,
                          "createdAt": "2023-11-06T06:17:52.880Z",
                          "updatedAt": "2023-11-06T06:17:52.880Z"
                      },
                      {
                          "id": 7,
                          "templateTabId": 8,
                          "name": "list2b3",
                          "displayOrder": 2,
                          "createdAt": "2023-11-06T06:17:52.880Z",
                          "updatedAt": "2023-11-06T06:17:52.880Z"
                      },
                      {
                          "id": 8,
                          "templateTabId": 8,
                          "name": "list3b3",
                          "displayOrder": 3,
                          "createdAt": "2023-11-06T06:17:52.880Z",
                          "updatedAt": "2023-11-06T06:17:52.880Z"
                      },
                      {
                          "id": 9,
                          "templateTabId": 8,
                          "name": "list4b3",
                          "displayOrder": 4,
                          "createdAt": "2023-11-06T06:17:52.880Z",
                          "updatedAt": "2023-11-06T06:17:52.880Z"
                      }
                  ]
              }
          ]
      },
      {
          "id": 7,
          "userId": 1,
          "name": "Test template3",
          "createdAt": "2023-11-06T05:21:06.586Z",
          "updatedAt": "2023-11-06T05:21:06.586Z",
          "tabs": []
      },
      {
          "id": 9,
          "userId": 1,
          "name": "Test template3",
          "createdAt": "2023-11-06T05:25:59.561Z",
          "updatedAt": "2023-11-06T05:25:59.561Z",
          "tabs": []
      },
      {
          "id": 14,
          "userId": 1,
          "name": "Test template3",
          "createdAt": "2023-11-06T05:31:03.785Z",
          "updatedAt": "2023-11-06T05:31:03.785Z",
          "tabs": []
      },
      {
          "id": 1,
          "userId": 1,
          "name": "Test template",
          "createdAt": "2023-11-05T23:29:33.613Z",
          "updatedAt": "2023-11-05T23:29:33.613Z",
          "tabs": []
      },
      {
          "id": 8,
          "userId": 1,
          "name": "Test template3",
          "createdAt": "2023-11-06T05:21:06.586Z",
          "updatedAt": "2023-11-06T05:21:06.586Z",
          "tabs": []
      },
      {
          "id": 13,
          "userId": 1,
          "name": "Test template3",
          "createdAt": "2023-11-06T05:28:57.700Z",
          "updatedAt": "2023-11-06T05:28:57.700Z",
          "tabs": []
      },
      {
          "id": 2,
          "userId": 1,
          "name": "Test template2",
          "createdAt": "2023-11-05T23:37:40.550Z",
          "updatedAt": "2023-11-05T23:37:40.550Z",
          "tabs": []
      },
      {
          "id": 10,
          "userId": 1,
          "name": "Test template3",
          "createdAt": "2023-11-06T05:25:59.561Z",
          "updatedAt": "2023-11-06T05:25:59.561Z",
          "tabs": []
      },
      {
          "id": 12,
          "userId": 1,
          "name": "Test template3",
          "createdAt": "2023-11-06T05:28:36.920Z",
          "updatedAt": "2023-11-06T05:28:36.920Z",
          "tabs": []
      },
      {
          "id": 11,
          "userId": 1,
          "name": "Test template3",
          "createdAt": "2023-11-06T05:26:10.504Z",
          "updatedAt": "2023-11-06T05:26:10.504Z",
          "tabs": []
      }
  ]
};






const TemplateListPage = () => {
  // TODO: Fix later
  const templates = tmpResponse;

  return (
    <DashboardLayout backButtonHref={getWebRoute('dashboard')}>
      <LoadingOverlay loading={false} />
      <MainContainer>
        <h1>Templates</h1>
      </MainContainer>
    </DashboardLayout>
  );
};

export default TemplateListPage;
