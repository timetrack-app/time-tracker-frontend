import React from 'react';
import styled from 'styled-components';

// stores
import { useAppSelector } from '../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../stores/slices/colorThemeSlice';

// types
import { ColorThemeName } from '../../../../../../types/colorTheme';

// const
import { listRenameRequired } from '../../../../../../const/validation/messages';

// components
import { TextInput } from '../../../../../../components/elements/ReactHookForm';
import {
  ButtonPrimary,
  ButtonSecondary,
} from '../../../../../../components/elements/common';
// forms
import { RenameListForm, RenameListFormContentWrapper } from '../../../forms';

type RenameListPopoverProps = {
  listPosition: DOMRect;
  currentListName: string;
  isOpen: boolean;
  onSubmit: (newName: string) => void;
  onDiscard: () => void;
};

type RenameListFormValues = {
  listName: string;
};

const ContainerDiv = styled.div<{ listPosition: DOMRect }>`
  position: absolute;
  /* TODO : more accurate z-index */
  z-index: 999;
  top: ${({ listPosition }) => listPosition.top + 28}px;
  left: ${({ listPosition }) =>
    // TODO : Find better way to calculate left position
    listPosition.left + 80}px;
`;

// TODO : Make styling better
const PopoverContainer = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  position: absolute;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none'};
  border-radius: 4px;
  padding: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const RenameListPopover = ({
  listPosition,
  currentListName,
  isOpen,
  onSubmit,
  onDiscard,
}: RenameListPopoverProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);

  const defaultValues = {
    listName: currentListName,
  };

  return isOpen ? (
    <ContainerDiv listPosition={listPosition}>
      <PopoverContainer colorThemeName={currentColorThemeName}>
        <RenameListForm<RenameListFormValues>
          onSubmit={(values) => {
            onSubmit(values.listName);
          }}
          options={{ defaultValues }}
        >
          {({ register, formState }) => (
            <RenameListFormContentWrapper
              submitButton={
                <ButtonPrimary type="submit">
                  <p>Rename</p>
                </ButtonPrimary>
              }
              discardButton={
                <ButtonSecondary onClick={onDiscard}>
                  <p>Discard</p>
                </ButtonSecondary>
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
              />
            </RenameListFormContentWrapper>
          )}
        </RenameListForm>
      </PopoverContainer>
    </ContainerDiv>
  ) : null;
};

export default RenameListPopover;
