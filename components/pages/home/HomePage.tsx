import { useIsFetching, useIsMutating } from 'react-query';
import styled from 'styled-components';

import OnGoingTimerArea from '../../elements/OnGoingTimerArea/OnGoingTimerArea';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import TabsArea from '../../elements/TabArea/TabsArea';
import Navbar from '../../elements/Navbar/Navbar';

const MainAreaContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 24px;
  padding-inline: 24px;
  padding-bottom: 24px;
`;

const testTabs = [
  {
    id: 1,
    name: 'Tab 1',
    displayOrder: 1,
    taskLists: [
      {
        id: 1,
        name: 'Task List 1',
        displayOrder: 1,
        tasks: [
          {
            id: 1,
            displayOrder: 1,
            name: 'Task 1',
            description: 'Description for Task 1',
            totalTime: 30,
          },
          {
            id: 2,
            displayOrder: 2,
            name: 'Task 2',
            description: 'Description for Task 2',
            totalTime: 45,
          },
        ],
      },
      {
        id: 2,
        name: 'Task List 2',
        displayOrder: 2,
        tasks: [
          {
            id: 3,
            displayOrder: 1,
            name: 'Task 3',
            description: 'Description for Task 3',
            totalTime: 20,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Tab 2',
    displayOrder: 2,
    taskLists: [
      {
        id: 3,
        name: 'Task List 3',
        displayOrder: 1,
        tasks: [
          {
            id: 4,
            displayOrder: 1,
            name: 'Task 4',
            description: 'Description for Task 4',
            totalTime: 15,
          },
        ],
      },
      // You can add more task lists for Tab 2 if needed
    ],
  },
  {
    id: 3,
    name: 'Tab 3',
    displayOrder: 3,
    taskLists: [
      // Define task lists for Tab 3 here if needed
    ],
  },
  // Add more tabs as needed
];

// You can now use the 'tabs' variable, which is of type 'Tab[]'.

const HomePage = () => {
  // TODO: Check if this method works or not...
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <Navbar />
      <MainAreaContainer>
        <OnGoingTimerArea />
        <TabsArea tabs={testTabs} />
      </MainAreaContainer>
    </>
  );
};

export default HomePage;
