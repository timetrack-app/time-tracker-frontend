import { Tab } from '../../../types/entity';

// Params
export type EndWorkSessionParams = {
  userId: number;
  workSessionId: number;
};

export type CreateWorkSessionParams = {
  userId: number;
  tabs: Tab[];
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
