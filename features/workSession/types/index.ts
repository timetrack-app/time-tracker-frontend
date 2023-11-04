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
