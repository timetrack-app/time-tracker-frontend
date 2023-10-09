import { useEffect } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';
import styled from 'styled-components';

import OnGoingTimerArea from '../../../features/workSession/components/elements/OnGoingTimerArea/OnGoingTimerArea';
import TabsArea from '../../../features/workSession/components/elements/TabArea/TabsArea';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import MobileMenu from '../../elements/common/MobileMenu/MobileMenu';
import Navbar from '../../elements/Navbar/Navbar';

import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { selectActiveTask, updateActiveTaskName } from '../../../stores/slices/activeTaskSlice';
import { selectCurrentSelectedTab } from '../../../stores/slices/selectedTabSlice';

import { breakPoint } from '../../../const/styles/breakPoint';
import { useElapsedTimeCalc } from '../../../hooks/useElapsedTimeCalc';

import { Tab, Task, TaskList } from '../../../types/entity';

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
  {
    id: 4,
    name: 'Tab 4',
    displayOrder: 4,
    taskLists: [
      // Define task lists for Tab 3 here if needed
    ],
  },
  {
    id: 5,
    name: 'Tab 5',
    displayOrder: 5,
    taskLists: [
      // Define task lists for Tab 3 here if needed
    ],
  },
  {
    id: 6,
    name: 'Tab 6',
    displayOrder: 6,
    taskLists: [
      // Define task lists for Tab 3 here if needed
    ],
  },
];

// TODO: MainAreaContainer -> flex-direction: column;
const MainAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 100vh;
  gap: 24px;
  padding: 2em 1.5em 1.5em;

  @media ${breakPoint.tablet} {
    flex-direction: row;
    align-items: normal;
    padding-inline: 24px;
    padding-bottom: 24px;
  }
`;

//TODO: centralize all the elements, and set max/min width to prevent the elements expand forever(especially tab area)



// You can now use the 'tabs' variable, which is of type 'Tab[]'.

const HomePage = () => {
  // TODO: Check if this method works or not...
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  const dispatch = useAppDispatch();
  const activeTask = useAppSelector(selectActiveTask);
  const selectedTab = useAppSelector(selectCurrentSelectedTab);

  // TODO: temporary solution. fix later
  const tabs = testTabs;

  const { calcTotalTimeSec, calcTotalTimeSecOfATab } = useElapsedTimeCalc();


  // TODO: replace with valid items later...
  const menuItems = [
    'item1',
    'item2',
    'item3',
    'item4',
  ];

  // TODO: in tab total
  // sum up totalSec of every task in tab
  // if active task is in the tab, add up

  // TODO: Temporary solution. Fix this later
  useEffect(() => {
    dispatch(updateActiveTaskName('Sample task 01'));
  }, [dispatch]);

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <Navbar />
      <MobileMenu items={menuItems} />
      <MainAreaContainer>
        <OnGoingTimerArea
          activeTaskName={activeTask.name}
          activeTaskElapsedTimeSec={activeTask.elapsedSeconds}
          totalTimeSec={calcTotalTimeSec(tabs)}
          totalTimeSecInSelectedTab={calcTotalTimeSecOfATab(tabs, selectedTab.id)}
        />
        <TabsArea tabs={testTabs} />
      </MainAreaContainer>
    </>
  );
};

export default HomePage;
