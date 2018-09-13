/* eslint-disable no-underscore-dangle, no-unused-expressions */

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider, injectGlobal } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import App from '../../ui/layouts/App';
import '../both/api';

Bert.defaults.style = 'growl-bottom-right';

const apolloClient = new ApolloClient({
  uri: Meteor.settings.public.graphQL.uri,
  request: (operation) =>
    operation.setContext(() => ({
      headers: {
        authorization: Accounts._storedLoginToken(),
      },
    })),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

Accounts.onLogout(() => apolloClient.resetStore());

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

  .table tr td {
    vertical-align: middle !important;
  }

  /* Removes unnecessary bottom padding on .container */
  body > #react-root > div > .container {
    padding-bottom: 0;
  }

  @media screen and (min-width: 768px) {
    .page-header {
      margin-top: 20px;
    }
  }
`;

Meteor.startup(() =>
  hydrate(
    <ThemeProvider theme={{}}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Switch>
            <App />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>,
    document.getElementById('react-root'),
  ),
);
