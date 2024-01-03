import React from 'react';
import styled from 'styled-components';

// stores
import { useAppSelector } from '../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../stores/slices/colorThemeSlice';

// types
import { ColorThemeName } from '../../../../../types/colorTheme';

// const
import { tabRenameRequired } from '../../../../../const/validation/messages';

// components
import { RenameTabForm, RenameTabFormContentWrapper } from '../../forms';
import { TextInput } from '../../../../../components/elements/ReactHookForm';
import {
  ButtonPrimary,
  ButtonSecondary,
} from '../../../../../components/elements/common';

type RenameTabPopoverProps = {
  editableTabSelectorPosition: DOMRect;
  currentTabName: string;
  isOpen: boolean;
  onSubmit: (newName: string) => void;
  onDiscard: () => void;
};

type RenameTabFormValues = {
  tabName: string;
};

const ContainerDiv = styled.div<{ editableTabSelectorPosition: DOMRect }>`
  position: absolute;
  /* TODO : more accurate z-index */
  z-index: 999;
  top: ${({ editableTabSelectorPosition }) =>
    editableTabSelectorPosition.top + 28}px;
  left: ${({ editableTabSelectorPosition }) =>
    // TODO : Find better way to calculate left position
    editableTabSelectorPosition.left + 80}px;
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

const RenameTabPopover = ({
  editableTabSelectorPosition,
  currentTabName,
  isOpen,
  onSubmit,
  onDiscard,
}: RenameTabPopoverProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);

  const defaultValues = {
    tabName: currentTabName,
  };

  return isOpen ? (
    <ContainerDiv editableTabSelectorPosition={editableTabSelectorPosition}>
      <PopoverContainer colorThemeName={currentColorThemeName}>
        <RenameTabForm<RenameTabFormValues>
          onSubmit={(values) => {
            onSubmit(values.tabName);
          }}
          options={{ defaultValues }}
        >
          {({ register, formState }) => (
            <RenameTabFormContentWrapper
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
      </PopoverContainer>
    </ContainerDiv>
  ) : null;
};

export default RenameTabPopover;
