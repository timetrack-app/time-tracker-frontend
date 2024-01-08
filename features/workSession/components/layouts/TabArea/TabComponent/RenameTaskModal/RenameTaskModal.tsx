import React from 'react';
import styled from 'styled-components';

// const
import { taskRenameRequired } from '../../../../../../../const/validation/messages';

// forms
import { RenameTaskForm, RenameTaskFormContentWrapper } from './RenameTaskForm';

// components
import { TextInput } from '../../../../../../../components/elements/ReactHookForm';
import {
  ButtonPrimary,
  ButtonSecondary,
  Modal,
  ModalProps,
} from '../../../../../../../components/elements/common';
import { breakPoint } from '../../../../../../../const/styles/breakPoint';

type RenameTaskModalProps = {
  currentTaskName: string;
  onSubmit: (newName: string) => void;
} & ModalProps;

type RenameTaskFormValues = {
  taskName: string;
};

const BodyDiv = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;

  @media ${breakPoint.tablet} {
    width: 30em;
  }
`;

const StyledButtonPrimary = styled(ButtonPrimary)`
  font-size: 1em;
`;

const StyledButtonSecondary = styled(ButtonSecondary)`
  font-size: 1em;
`;

const RenameTaskModal = ({
  currentTaskName,
  isOpen,
  onClose,
  onSubmit,
}: RenameTaskModalProps) => {
  const defaultValues: RenameTaskFormValues = {
    taskName: currentTaskName,
  };
  return isOpen ? (
    <Modal isOpen={isOpen} onClose={onClose} title="Rename Task">
      <BodyDiv>
        <RenameTaskForm<RenameTaskFormValues>
          onSubmit={(values) => {
            onSubmit(values.taskName);
          }}
          options={{ defaultValues }}
        >
          {({ register, formState }) => (
            <RenameTaskFormContentWrapper
              submitButton={
                <StyledButtonPrimary type="submit">
                  <p>Rename</p>
                </StyledButtonPrimary>
              }
              discardButton={
                <StyledButtonSecondary onClick={onClose}>
                  <p>Discard</p>
                </StyledButtonSecondary>
              }
            >
              <TextInput
                type="text"
                placeholder={currentTaskName}
                label=""
                registration={register('taskName', {
                  required: taskRenameRequired,
                })}
                error={formState.errors.taskName}
                autoFocus
              />
            </RenameTaskFormContentWrapper>
          )}
        </RenameTaskForm>
      </BodyDiv>
    </Modal>
  ) : null;
};

export default RenameTaskModal;
