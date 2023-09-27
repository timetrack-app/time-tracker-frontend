import styled from 'styled-components';

const OverlayDiv = styled.div<{ isLoading: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
    z-index: 9999;
`;

const LoaderWrapperDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type OverlayProps = {
  isLoading?: boolean
  children?: React.ReactNode
};

/**
 * Translucent overlay for loading view
 *
 * @param {OverlayProps} { isLoading = false, children }
 */
const Overlay = ({ isLoading = false, children }: OverlayProps) => (
  <OverlayDiv isLoading={isLoading}>
    <LoaderWrapperDiv>
      {children}
    </LoaderWrapperDiv>
  </OverlayDiv>
);

export default Overlay;
