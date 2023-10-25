import React from 'react';
import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';

import { Tab } from '../../../../../../types/entity';

import ButtonPrimary from '../../../../../../components/elements/common/Button/ButtonPrimary';
import Modal from '../../../../../../components/elements/common/Modal/Modal';
import { TextInput } from '../../../../../../components/elements/ReactHookForm';
import { SelectInput } from '../../../../../../components/elements/ReactHookForm/SelectInput';
import CreateInitialTaskForm from './CreateInitialTaskForm/CreateInitialTaskForm';
import CreateInitialTaskFormContentsWrapper from './CreateInitialTaskFormContentsWrapper/CreateInitialTaskFormContentsWrapper';

import { breakPoint } from '../../../../../../const/styles/breakPoint';
import { taskNameRequired } from '../../../../../../const/validation/messages';

type CreateInitialTaskModalProps = {
  isOpen: boolean;
  tabs: Tab[];
  onClose: () => void;
  startWorkSession: () => void;
};

type CreateInitialTaskFormValues = {
  tabIndex: number;
  listIndex: number;
  taskName: string;
};

const defaultValues: CreateInitialTaskFormValues = {
  tabIndex: 0,
  listIndex: 0,
  taskName: '',
};

const BodyDiv = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;

  padding: 1em 1em 2em;

  @media ${breakPoint.tablet} {
    width: 30em;
  }
`;

const MessageP = styled.p`
  font-size: 1.2em;
`;

const CreateInitialTaskModal = ({
  isOpen,
  tabs,
  onClose,
  startWorkSession,
}: CreateInitialTaskModalProps) => {
  const onSubmit: SubmitHandler<CreateInitialTaskFormValues> = async ({
    listIndex,
    taskName,
  }) => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <BodyDiv>
        <MessageP> initial task</MessageP>
        <CreateInitialTaskForm<CreateInitialTaskFormValues>
          onSubmit={onSubmit}
          options={{ defaultValues }}
        >
          {({ register, formState, getValues }) => (
            <CreateInitialTaskFormContentsWrapper
              button={
                <ButtonPrimary type="submit" onClick={startWorkSession}>
                  Start Session
                </ButtonPrimary>
              }
            >
              <SelectInput
                label="Choose a tab"
                defaultValue={0}
                registration={register('tabIndex')}
                options={tabs.map((tab, i) => {
                  return { label: tab.name, value: i };
                })}
              />
              <SelectInput
                label="Choose a list"
                defaultValue={0}
                registration={register('listIndex')}
                options={tabs[getValues('tabIndex')].taskLists.map(
                  (taskList, i) => {
                    return { label: taskList.name, value: i };
                  },
                )}
              />
              <TextInput
                type="text"
                placeholder="Type your first task name here"
                label="Task name"
                registration={register('taskName', {
                  required: taskNameRequired,
                })}
                error={formState.errors.taskName}
              />
            </CreateInitialTaskFormContentsWrapper>
          )}
        </CreateInitialTaskForm>
      </BodyDiv>
    </Modal>
  );
};

export default CreateInitialTaskModal;
