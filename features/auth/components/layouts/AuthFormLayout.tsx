import styled from 'styled-components';

const MainContainerDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em 4em;
`;

type Props = {
  children?: React.ReactNode
};

/**
 * Main layout component for login and registration pages
 *
 * @param {Props} { children }
 * @returns {JSX.Element}
 */
const AuthFormLayout = ({ children }: Props) => (
  <MainContainerDiv>
    {children}
  </MainContainerDiv>
);

export default AuthFormLayout;
