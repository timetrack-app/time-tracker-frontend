import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Tab } from '../../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../../types/colorTheme';
import { useAppSelector } from '../../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../../stores/slices/colorThemeSlice';
import EditTabMenuBar from './EditTabMenuBar/EditTabMenuBar';
import RenameTabPopover from './RenameTabPopover/RenameTabPopover';

export type TabSelectorProps = {
  tab: Tab;
  className?: string;
};

const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  width: 7em;
  height: 1.8em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  margin-bottom: 0.5em;
  padding: 0.5em;
  cursor: pointer;
  border: 1px solid
    ${({ theme, colorThemeName }) => {
      if (colorThemeName === 'dark') {
        return theme.colors.text;
      }

      return theme.colors.info;
    }};
  background: ${({ theme, colorThemeName }) => {
    if (colorThemeName === 'dark') {
      return theme.colors.info;
    }

    return theme.colors.infoBg;
  }};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 3px 6px 0 ${theme.colors.border}` : 'none'};
`;

const TabNameP = styled.p<{
  colorThemeName: ColorThemeName;
}>`
  color: ${({ theme, colorThemeName }) => {
    if (colorThemeName === 'dark') return theme.colors.text;

    return theme.colors.info;
  }};
  font-size: 1.25em;
`;

const IconButton = styled.button<{}>`
  background: none;
  border: none;

  // to outstand close icon in dark color overlay
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const EditableTabSelector = ({ tab, className }: TabSelectorProps) => {
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const [isRenamePopoverOpen, setIsRenamePopoverOpen] = useState(false);
  const currentColorThemeName = useAppSelector(selectColorTheme);

  const toggleMenuBar = () => {
    setIsMenuBarOpen(!isMenuBarOpen);
  };
  const onRename = () => {
    setIsMenuBarOpen(false);
    setIsRenamePopoverOpen(true);
  };

  const onDelete = () => {
    alert('delete');
  };

  const onSubmitRename = (newTabName: string) => {
    alert(newTabName);
  };

  const onDiscardRename = () => {
    setIsRenamePopoverOpen(false);
  };
  return (
    <>
      <ContainerDiv
        colorThemeName={currentColorThemeName}
        className={className}
      >
        <TabNameP colorThemeName={currentColorThemeName}>{tab.name}</TabNameP>
        <IconButton onClick={toggleMenuBar}>
          {isMenuBarOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </IconButton>
      </ContainerDiv>
      <EditTabMenuBar
        isOpen={isMenuBarOpen}
        onRename={onRename}
        onDelete={onDelete}
      />
      <RenameTabPopover
        currentTabName={tab.name}
        isOpen={isRenamePopoverOpen}
        onSubmit={onSubmitRename}
        onDiscard={onDiscardRename}
      />
    </>
  );
};

export default EditableTabSelector;
