import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #337ab7;
    --success: #5cb85c;
    --info: #5bc0de;
    --warning: #f0ad4e;
    --danger: #d9534f;

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

  .navbar {
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    margin-bottom: 20px;
  }

  .navbar-brand {
    font-size: 1.2rem;
  }
  
  .navbar-light .navbar-brand {
    color: #777;
  }

  form label {
    display: block;
  }

  form .control-label {
    display: block;
    margin-bottom: 7px;
  }

  form label.error {
    display: block;
    margin-top: 8px;
    font-size: 13px;
    font-weight: normal;
    color: var(--danger);
  }

  .page-header {
    padding-bottom: 9px;
    margin: 40px 0 20px;
    border-bottom: 1px solid #eee;
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

    .page-header {
      margin-top: 40px;
    }
  }
`;

export default GlobalStyle;
