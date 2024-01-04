import React, { MutableRefObject, useRef } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Tab } from '../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../types/colorTheme';
import { useAppSelector } from '../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../stores/slices/colorThemeSlice';
import { IconButton } from '../../../../../../components/elements/common';

export type TabSelectorProps = {
  tab: Tab;
  isOpenEditMenuPopover: boolean;
  toggleMenuPopover: (ref: MutableRefObject<HTMLElement>) => void;
  className?: string;
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

const EditableTabSelector = ({
  tab,
  className,
  isOpenEditMenuPopover,
  toggleMenuPopover,
}: TabSelectorProps) => {
  const ref = useRef(null);
  const currentColorThemeName = useAppSelector(selectColorTheme);

  return (
    <SelectorContainerDiv
      colorThemeName={currentColorThemeName}
      className={className}
      ref={ref}
    >
      <TabNameP colorThemeName={currentColorThemeName}>{tab.name}</TabNameP>
      <IconButton onClick={() => toggleMenuPopover(ref)}>
        {isOpenEditMenuPopover ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </IconButton>
    </SelectorContainerDiv>
  );
};

export default EditableTabSelector;
