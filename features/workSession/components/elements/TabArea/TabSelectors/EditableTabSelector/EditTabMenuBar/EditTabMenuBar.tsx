import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../../../stores/slices/colorThemeSlice';
import { ColorThemeName } from '../../../../../../../../types/colorTheme';

type MenuBarProps = {
  isOpen: boolean;
  onRename: () => void;
  onDelete: () => void;
};

const MenuBarContainer = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const MenuButton = styled.button<{
  colorThemeName: ColorThemeName;
}>`
  cursor: pointer;
  background: none;
  border: none;
  color: ${({ theme, colorThemeName }) =>
    colorThemeName === 'dark' ? theme.colors.text : theme.colors.info};
  margin-right: 1em;
`;

const EditTabMenuBar = ({ isOpen, onRename, onDelete }: MenuBarProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);

  return isOpen ? (
    <MenuBarContainer colorThemeName={currentColorThemeName}>
      <MenuButton colorThemeName={currentColorThemeName} onClick={onRename}>
        Rename
      </MenuButton>
      <MenuButton colorThemeName={currentColorThemeName} onClick={onDelete}>
        Delete
      </MenuButton>
    </MenuBarContainer>
  ) : null;
};

export default EditTabMenuBar;
