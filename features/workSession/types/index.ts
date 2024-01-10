import { Tab, WorkSession, TaskList, Task } from '../../../types/entity';

// API Params
export type EndWorkSessionParams = {
  authToken: string;
  userId: number;
  workSessionId: number;
};

export type CreateWorkSessionParams = {
  authToken: string;
  userId: number;
  tabs: Tab[];
};

export type GetLatestWorkSessionParams = {
  authToken: string;
  userId: number;
};

export type UpdateActiveTaskParams = {
  authToken: string;
  userId: number;
  workSessionId: number;
  activeTabId: number;
  activeListId: number;
  activeTaskId: number;
};

export type CreateTabParams = {
  authToken: string;
  workSessionId: number;
  name: string;
  displayOrder: number;
};

export type UpdateTabParams = {
  authToken: string;
  workSessionId: number;
  tabId: number;
  attr: Partial<Tab>;
};

export type DeleteTabParams = {
  authToken: string;
  workSessionId: number;
  tabId: number;
};

export type CreateListParams = {
  authToken: string;
  workSessionId: number;
  tabId: number;
  name: string;
  displayOrder: number;
};

export type UpdateListParams = {
  authToken: string;
  workSessionId: number;
  tabId: number;
  listId: number;
  attr: Partial<TaskList>;
};

export type DeleteListParams = {
  authToken: string;
  workSessionId: number;
  tabId: number;
  listId: number;
};

export type CreateTaskParams = {
  authToken: string;
  workSessionId: number;
  tabId: number;
  listId: number;
  name: string;
  description: string;
  displayOrder: number;
};

export type UpdateTaskParams = {
  authToken: string;
  workSessionId: number;
  tabId: number;
  listId: number;
  taskId: number;
  attr: Partial<Task>;
};

export type DeleteTaskParams = {
  authToken: string;
  workSessionId: number;
  tabId: number;
  listId: number;
  taskId: number;
};

// API Responses
export type CreateWorkSessionResponse = {
  isUnfinished: boolean;
  workSession: WorkSession;
};

export type GetLatestWorkSessionResponse = {
  workSession: WorkSession;
};

export type CreateTabResponse = {
  newTab: Tab;
};

export type UpdateTabResponse = {
  updatedTab: Tab;
};

export type CreateListResponse = {
  newList: TaskList;
};

export type UpdateListResponse = {
  updatedList: TaskList;
};

export type CreateTaskResponse = {
  newTask: Task;
};

export type UpdateTaskResponse = {
  updatedTask: Task;
};

// Related to initial task selection

export type TaskInfoForInitialSelection = {
  taskName: string;
  tabIndex: number;
  listIndex: number;
  taskIndex: number;
};

export type SelectInitialTaskFormValues = {
  taskInfoIndex: number;
};

type TemplateList = {
  id: number;
  templateTabId: number;
  name: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

type TemplateTab = {
  id: number;
  templateId: number;
  name: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  lists: TemplateList[];
};

type Template = {
  id: number;
  userId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  tabs: TemplateTab[];
};

export type GetTemplatesResponse = {
  templates: Template[];
  total: number;
  hasMore: boolean;
};

// Type for the timer count data to store in localStorage
export type LocalStoredTimerCountData = {
  taskId: string;
  startedDate: string;
};
