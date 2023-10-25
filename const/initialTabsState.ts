import { Tab } from '../types/entity';

//  TODO : Consider where to place this initial tabs state
export const initialTabs: Tab[] = [
  {
    id: 1,
    name: 'Untitled',
    displayOrder: 1,
    taskLists: [
      {
        id: 1,
        name: 'Untitled',
        displayOrder: 1,
        tasks: [
          {
            id: 1,
            name: 'aaa',
            displayOrder: 1,
            description: '',
            totalTime: 0,
          },
        ],
      },
    ],
  },
];
