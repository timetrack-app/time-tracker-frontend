import React, { useRef } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Tab } from '../../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../../types/colorTheme';
import { useAppSelector } from '../../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../../stores/slices/colorThemeSlice';

export type TabSelectorProps = {
  tab: Tab;
  className?: string;
  isOpenMenubar: boolean;
  toggleMenuBar: (rect: DOMRect) => void;
};

// Selector Container
const SelectorContainerDiv = styled.div<{
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

const EditableTabSelector = ({
  tab,
  className,
  isOpenMenubar,
  toggleMenuBar,
}: TabSelectorProps) => {
  const editableTabSelectorRef = useRef(null);
  const currentColorThemeName = useAppSelector(selectColorTheme);

  const handleToggleMenuBar = () => {
    if (!editableTabSelectorRef.current) return;
    const rect: DOMRect =
      editableTabSelectorRef.current.getBoundingClientRect();
    toggleMenuBar(rect);
  };
  return (
    <SelectorContainerDiv
      colorThemeName={currentColorThemeName}
      className={className}
      ref={editableTabSelectorRef}
    >
      <TabNameP colorThemeName={currentColorThemeName}>{tab.name}</TabNameP>
      <IconButton onClick={handleToggleMenuBar}>
        {isOpenMenubar ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </IconButton>
    </SelectorContainerDiv>
  );
};

export default EditableTabSelector;
