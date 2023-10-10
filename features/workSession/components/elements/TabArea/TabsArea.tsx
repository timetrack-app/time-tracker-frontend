import { useEffect, memo } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../stores/slices/colorThemeSlice';
import { updateSelectedTab, selectCurrentSelectedTab } from '../../../../../stores/slices/selectedTabSlice';

import { ColorThemeName } from '../../../../../types/colorTheme';
import { Tab } from '../../../../../types/entity';
import TabSelectors from './TabSelectors/TabSelectors';
import TabComponent from './TabComponent/TabComponent';

import { breakPoint } from '../../../../../const/styles/breakPoint';

const ContainerDiv = styled.div<{ colorThemeName: ColorThemeName }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.componentBackground};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none'};

  @media ${breakPoint.tablet} {
    // 100% - (width of OnGoingTimerArea + flex gap)
    width: calc(100% - (310px + 24px));
  }
`;

const TabSelectorWrapper = styled.div<{colorThemeName: ColorThemeName}>`
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-bottom: 12px;

  &::before, &::after {
    content: "";
    position: absolute;
    top: 0;
    z-index: 1;
    width: 20px;
    height: 100%;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: ${({ theme, colorThemeName }) =>
      colorThemeName === 'light'
        ? `linear-gradient(to right, ${theme.colors.componentBackground}, rgba(255,255,255,0))`
        : `linear-gradient(to right, ${theme.colors.componentBackground}, rgba(32,37,40,0))`};
  }

  &::after {
    right: 0;
    background: ${({ theme, colorThemeName }) =>
      colorThemeName === 'light'
        ? `linear-gradient(to left, ${theme.colors.componentBackground}, rgba(255,255,255,0))`
        : `linear-gradient(to left, ${theme.colors.componentBackground}, rgba(32,37,40,0))`};
  }

  @media ${breakPoint.tablet} {
    /* padding-right: 1em; */
  }
`;

const TabComponentWrapper = styled.div`
  height: 100%;
`;

type TabsAreaProps = {
  tabs: Tab[];
};

const TabsArea = ({ tabs }: TabsAreaProps) => {
  const currentColorTheme = useAppSelector(selectColorTheme);

  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(selectCurrentSelectedTab);

  // on selecting a tab
  const handleSelectTab = (tab: Tab) => {
    dispatch(updateSelectedTab(tab));
  };

  // on creating a new tab
  const handleCreateNewTab = () => {};

  useEffect(() => {
    dispatch(updateSelectedTab(tabs[0]));
  }, [dispatch]);

  return (
    <ContainerDiv colorThemeName={currentColorTheme}>
      <TabSelectorWrapper colorThemeName={currentColorTheme}>
        <TabSelectors
          tabs={tabs}
          selectedTabId={selectedTab.id}
          handleSelectTab={handleSelectTab}
          onClickPlusCircleButton={handleCreateNewTab}
        />
      </TabSelectorWrapper>
      <TabComponentWrapper>
        <TabComponent tab={selectedTab} />
      </TabComponentWrapper>
    </ContainerDiv>
  );
};

export default memo(TabsArea);
