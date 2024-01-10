import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

// stores
import { useAppSelector } from '../../../../../../../../../stores/hooks';
import { selectCurrentSelectedTab } from '../../../../../../../../../stores/slices/selectedTabSlice';

// forms
import { CreateTaskForm, CreateTaskFormTextInput } from './CreateTaskForm';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1000;
`;

const ContainerDiv = styled.div`
  width: 100%;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  z-index: 1001;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.componentBackground};
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

const CreateTaskFormCard = ({
  isOpen,
  onClose,
  listId,
  handleCreateNewTask,
}: Props) => {
  const { id: currentTabId } = useAppSelector(selectCurrentSelectedTab);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const handleKeydownEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', (e) => {
        handleKeydownEscape(e);
      });
    } else {
      window.removeEventListener('keydown', (e) => {
        handleKeydownEscape(e);
      });
    }
  });

  return (
    <>
      <Overlay onClick={handleOverlayClick} />
      <ContainerDiv>
        <CreateTaskForm<CreateTaskFormValues>
          onSubmit={(values) => {
            // empty description for now
            handleCreateNewTask(currentTabId, listId, values.taskName, '');
            onClose();
          }}
        >
          {({ register }) => (
            <CreateTaskFormTextInput
              placeholder="Type a name..."
              registration={register('taskName')}
              autoFocus
            />
          )}
        </CreateTaskForm>
      </ContainerDiv>
    </>
  );
};

export default CreateTaskFormCard;
