/* eslint-disable no-unused-expressions */

import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App/App';
import '../both/api';

injectGlobal`
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

  .navbar {
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
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
    margin-top: 0;
  }

  @media screen and (min-width: 768px) {
    .page-header {
      margin-top: 20px;
    }
  }
`;

const theme = {};

Meteor.startup(() => render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('react-root'),
));
