import { useIsFetching, useIsMutating } from 'react-query';
import styled from 'styled-components';

import OnGoingTimerArea from '../../elements/OnGoingTimerArea/OnGoingTimerArea';
import LoadingOverlay from '../../elements/LoadingOverlay/LoadingOverlay';
import TabsArea from '../../elements/TabArea/TabsArea';
import Navbar from '../../elements/Navbar/Navbar';

const MainAreaContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 24px;
  padding-inline: 24px;
  padding-bottom: 24px;
`;

const HomePage = () => {
  // TODO: Check if this method works or not...
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <Navbar />
      <MainAreaContainer>
        <OnGoingTimerArea />
        <TabsArea tabs={[]} />
      </MainAreaContainer>
    </>
  );
};

export default HomePage;
