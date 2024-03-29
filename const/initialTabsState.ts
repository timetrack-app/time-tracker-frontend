import { Tab, Task, TaskList } from '../types/entity';

export const initialDefaultTask: Task = {
  id: 1,
  name: 'Untitled',
  displayOrder: 1,
  description: '',
  totalTime: 0,
  isActive: false,
  listId: 1,
};

export const initialDefaultTaskList: TaskList = {
  id: 1,
  name: 'Untitled',
  displayOrder: 1,
  tasks: [initialDefaultTask],
  tabId: 1,
};

//  TODO : Consider where to place this initial tabs state
export const initialTabs: Tab[] = [
  {
    id: 1,
    name: 'Untitled',
    displayOrder: 1,
    lists: [initialDefaultTaskList],
  },
];
