import React, { MutableRefObject, useRef } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';

import { Tab } from '../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../types/colorTheme';
import { useAppSelector } from '../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../stores/slices/colorThemeSlice';
import { IconButton } from '../../../../../../components/elements/common';

export type TabSelectorProps = {
  tab: Tab;
  onOpenMenuPopover: (ref: MutableRefObject<HTMLElement>) => void;
  className?: string;
};

// Selector Container
const SelectorContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  width: 112px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 12px;
  gap: 12px;
  color: ${({ theme, colorThemeName }) => {
    if (colorThemeName === 'dark') return theme.colors.text;

    return theme.colors.info;
  }};
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
`;

const TabNameP = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const EditableTabSelector = ({
  tab,
  className,
  onOpenMenuPopover,
}: TabSelectorProps) => {
  const ref = useRef(null);
  const currentColorThemeName = useAppSelector(selectColorTheme);

  return (
    <SelectorContainerDiv
      colorThemeName={currentColorThemeName}
      className={className}
      ref={ref}
    >
      <TabNameP>{tab.name}</TabNameP>
      <IconButton onClick={() => onOpenMenuPopover(ref)}>
        <BsThreeDots />
      </IconButton>
    </SelectorContainerDiv>
  );
};

export default EditableTabSelector;
