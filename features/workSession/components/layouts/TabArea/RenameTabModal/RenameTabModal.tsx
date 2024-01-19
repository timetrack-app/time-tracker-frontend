import React from 'react';
import styled from 'styled-components';

// const
import { tabRenameRequired } from '../../../../../../const/validation/messages';

// forms
import { RenameTabForm, RenameTabFormContentWrapper } from './RenameTabForm';

// components
import { TextInput } from '../../../../../../components/elements/ReactHookForm';
import {
  ButtonPrimary,
  ButtonSecondary,
  Modal,
  ModalProps,
} from '../../../../../../components/elements/common';
import { breakPoint } from '../../../../../../const/styles/breakPoint';

type RenameTabModalProps = {
  currentTabName: string;
  onSubmit: (newName: string) => void;
} & ModalProps;

type RenameTabFormValues = {
  tabName: string;
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

const RenameTabModal = ({
  currentTabName,
  isOpen,
  onClose,
  onSubmit,
}: RenameTabModalProps) => {
  const defaultValues: RenameTabFormValues = {
    tabName: currentTabName,
  };
  return isOpen ? (
    <Modal isOpen={isOpen} onClose={onClose} title="Rename tab">
      <BodyDiv>
        <RenameTabForm<RenameTabFormValues>
          onSubmit={(values) => {
            onSubmit(values.tabName);
            onClose();
          }}
          options={{ defaultValues }}
        >
          {({ register, formState }) => (
            <RenameTabFormContentWrapper
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
                placeholder={currentTabName}
                label=""
                registration={register('tabName', {
                  required: tabRenameRequired,
                })}
                error={formState.errors.tabName}
                autoFocus
              />
            </RenameTabFormContentWrapper>
          )}
        </RenameTabForm>
      </BodyDiv>
    </Modal>
  ) : null;
};

export default RenameTabModal;
