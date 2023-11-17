import { createGlobalStyle } from 'styled-components';

import { vegetation, coralRed } from '../const/styles/colors';

const GlobalStyle = createGlobalStyle`
  :root {
    // https://fkhadra.github.io/react-toastify/how-to-style/
    --toastify-color-success: ${vegetation};
    --toastify-color-error: ${coralRed};
    --toastify-toast-width: 380px;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  html,
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    padding: 0;
    margin: 0;
    /* font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; */
    font-family: 'Monospace', Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
