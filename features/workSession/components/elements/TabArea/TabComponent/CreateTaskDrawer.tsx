import styled from 'styled-components';
import { KeyboardEvent } from 'react';
import { useAppSelector } from '../../../../../../stores/hooks';

import { selectCurrentSelectedTab } from '../../../../../../stores/slices/selectedTabSlice';

import { taskNameRequiredMsg } from '../../../../../../const/validation/messages';

import {
  CreateTaskForm,
  CreateTaskFormContentsWrapper,
  CreateTaskFormTextInput,
} from '../../forms/CreateTaskForm';

const BottomDrawerWrapperDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  z-index: 9999;
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  listId: number;
  handleCreateNewTask: (
    tabId: number,
    listId: number,
    taskName: string,
    description: string,
  ) => Promise<void>;
};

type CreateTaskFormValues = {
  taskName: string;
  description: string;
};

/**
 *
 *
 * @param {Props} { isOpen, onClose, handleCreateNewTask }
 * @return {JSX.Element}
 */
const CreateTaskDrawer = ({
  isOpen,
  onClose,
  listId,
  handleCreateNewTask,
}: Props) => {
  const { id: currentTabId } = useAppSelector(selectCurrentSelectedTab);
  const onEscKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.key === 'Escape' && onClose();
  };
  return isOpen ? (
    <BottomDrawerWrapperDiv onKeyDown={(e) => onEscKeyDown(e)}>
      <CreateTaskForm<CreateTaskFormValues>
        onSubmit={(values) => {
          // empty description for now
          handleCreateNewTask(currentTabId, listId, values.taskName, '');
          onClose();
        }}
      >
        {({ register, formState }) => (
          <CreateTaskFormContentsWrapper>
            <CreateTaskFormTextInput
              placeholder="Start create new task"
              registration={register('taskName', {
                required: taskNameRequiredMsg,
              })}
              error={formState.errors.taskName}
            />
          </CreateTaskFormContentsWrapper>
        )}
      </CreateTaskForm>
    </BottomDrawerWrapperDiv>
  ) : (
    <></>
  );
};

export default CreateTaskDrawer;
