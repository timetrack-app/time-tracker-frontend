import React from 'react';
import styled from 'styled-components';

// const
import { listRenameRequired } from '../../../../../../../const/validation/messages';

// forms
import { RenameListForm, RenameListFormContentWrapper } from './RenameListForm';

// components
import { TextInput } from '../../../../../../../components/elements/ReactHookForm';
import {
  ButtonPrimary,
  ButtonSecondary,
  Modal,
  ModalProps,
} from '../../../../../../../components/elements/common';
import { breakPoint } from '../../../../../../../const/styles/breakPoint';

type RenameListModalProps = {
  currentListName: string;
  onSubmit: (newName: string) => void;
} & ModalProps;

type RenameListFormValues = {
  listName: string;
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

const RenameListModal = ({
  currentListName,
  isOpen,
  onClose,
  onSubmit,
}: RenameListModalProps) => {
  const defaultValues: RenameListFormValues = {
    listName: currentListName,
  };
  return isOpen ? (
    <Modal isOpen={isOpen} onClose={onClose} title="Rename list">
      <BodyDiv>
        <RenameListForm<RenameListFormValues>
          onSubmit={(values) => {
            onSubmit(values.listName);
            onClose();
          }}
          options={{ defaultValues }}
        >
          {({ register, formState }) => (
            <RenameListFormContentWrapper
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
                placeholder={currentListName}
                label=""
                registration={register('listName', {
                  required: listRenameRequired,
                })}
                error={formState.errors.listName}
                autoFocus
              />
            </RenameListFormContentWrapper>
          )}
        </RenameListForm>
      </BodyDiv>
    </Modal>
  ) : null;
};

export default RenameListModal;
