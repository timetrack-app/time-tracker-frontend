import styled from 'styled-components';

import ButtonPrimary from '../../../../../components/elements/common/Button/ButtonPrimary';
import Modal from '../../../../../components/elements/common/Modal/Modal';

import { breakPoint } from '../../../../../const/styles/breakPoint';
import { SelectInput } from '../../../../../components/elements/ReactHookForm/SelectInput';

// form
import {
  SelectInitialTaskForm,
  SelectInitialTaskFormContentWrapper,
} from './SelectInitialTaskForm';

import {
  SelectInitialTaskFormValues,
  TaskInfoForInitialSelection,
} from '../../../types';

type SelectInitialTaskModalProps = {
  isOpen: boolean;
  selectableTaskInfos: TaskInfoForInitialSelection[];
  onClose: () => void;
  startWorkSession: (initialTaskInfo: SelectInitialTaskFormValues) => void;
};

const defaultValues: SelectInitialTaskFormValues = {
  taskInfoIndex: 0,
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

const SelectInitialTaskModal = ({
  isOpen,
  selectableTaskInfos,
  onClose,
  startWorkSession,
}: SelectInitialTaskModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <BodyDiv>
        <MessageP>Select initial task</MessageP>

        <SelectInitialTaskForm<SelectInitialTaskFormValues>
          onSubmit={startWorkSession}
          options={{ defaultValues }}
        >
          {({ register }) => (
            <SelectInitialTaskFormContentWrapper
              button={
                <ButtonPrimary type="submit">Start Session</ButtonPrimary>
              }
            >
              <SelectInput
                label="Choose a task"
                defaultValue={0}
                registration={register('taskInfoIndex')}
                options={selectableTaskInfos.map((taskInfo, i) => {
                  return { label: taskInfo.taskName, value: i };
                })}
              />
            </SelectInitialTaskFormContentWrapper>
          )}
        </SelectInitialTaskForm>
      </BodyDiv>
    </Modal>
  );
};

export default SelectInitialTaskModal;
