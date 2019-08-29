import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #007bff;
    --secondary: #6c757d;
    --success: #28a745;
    --info: #17a2b8;
    --warning: #ffc107;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #f8f9fa;

    --gray-darker: #222;
    --gray-dark: #333;
    --gray: #555;
    --gray-light: #777;
    --gray-lighter: #eee;

    --facebook: #3b5998;
    --google: #ea4335;
    --github: var(--gray-dark);

    --cb-blue: #4285F4;
    --cb-green: #00D490;
    --cb-yellow: #FFCF50;
    --cb-red: #DA5847;
  }

  html {
    position: relative;
    min-height: 100%;
  }

  body {
    margin-bottom: 80px;
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 20px;
  }

  body.isViewDocument {
    padding-top: 20px;
  }

  body.isViewDocument .navbar {
    display: none;
  }

  form label {
    display: block;
  }
  
  form label.error {
    display: block;
    margin-top: 8px;
    font-size: 13px;
    font-weight: normal;
    color: var(--danger);
  }

  .table tr td {
    vertical-align: middle !important;
  }

  /* Removes unnecessary bottom padding on .container */
  body > #react-root > div > .container {
    padding-bottom: 0;
  }

  @media screen and (min-width: 768px) {
    body.isViewDocument {
      padding-top: 40px;
    }
  }
`;

export default GlobalStyle;
