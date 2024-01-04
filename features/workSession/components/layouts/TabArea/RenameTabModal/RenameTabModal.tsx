import React from 'react';
import styled from 'styled-components';

// const
import { tabRenameRequired } from '../../../../../../const/validation/messages';

// forms
import { RenameTabForm, RenameTabFormContentWrapper } from './RenameTabForm';

// components
import { TextInput } from '../../../../../../components/elements/ReactHookForm';
import {
  Button,
  ButtonPrimary,
  Modal,
  ModalProps,
} from '../../../../../../components/elements/common';

type RenameTabModalProps = {
  currentTabName: string;
  onSubmit: (newName: string) => void;
} & ModalProps;

type RenameTabFormValues = {
  tabName: string;
};

const StyledPrimaryButton = styled(ButtonPrimary)`
  font-size: 0.8em;
`;

const StyledButton = styled(Button)`
  font-size: 0.8em;
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
      <RenameTabForm<RenameTabFormValues>
        onSubmit={(values) => {
          onSubmit(values.tabName);
        }}
        options={{ defaultValues }}
      >
        {({ register, formState }) => (
          <RenameTabFormContentWrapper
            submitButton={
              <StyledPrimaryButton type="submit">
                <p>Rename</p>
              </StyledPrimaryButton>
            }
            discardButton={
              <StyledButton onClick={onClose}>
                <p>Discard</p>
              </StyledButton>
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
            />
          </RenameTabFormContentWrapper>
        )}
      </RenameTabForm>
    </Modal>
  ) : null;
};

export default RenameTabModal;
