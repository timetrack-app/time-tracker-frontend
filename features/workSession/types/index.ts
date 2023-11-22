import { Tab, WorkSession } from '../../../types/entity';

// API Params
export type EndWorkSessionParams = {
  userId: number;
  workSessionId: number;
};

export type CreateWorkSessionParams = {
  userId: number;
  tabs: Tab[];
};

export type GetLatestWorkSessionParams = {
  userId: number;
};

// API Responses
export type CreateWorkSessionResponse = {
  isUnfinished: boolean;
  workSession: WorkSession;
};

export type GetLatestWorkSessionResponse = {
  workSession: WorkSession;
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
// Related to Tab
export type CreateTabParams = {
  workSessionId: number;
  name: string;
  displayOrder: number;
};

export type CreateTabResponse = {
  newTab: Tab;
};

// Type for the timer count data to store in localStorage
export type LocalStoredTimerCountData = {
  taskId: string;
  startedDate: string;
};
