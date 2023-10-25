import { Tab } from '../../../types/entity';

export type EndWorkSessionParams = {
  userId: number;
  workSessionId: number;
};

export type CreateWorkSessionParams = {
  userId: number;
  tabs: Tab[];
};
