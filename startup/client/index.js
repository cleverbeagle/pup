/* eslint-disable no-underscore-dangle, no-unused-expressions */

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import App from '../../ui/layouts/App';
import GlobalStyle from './GlobalStyle';
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

Meteor.startup(() =>
  hydrate(
    <ThemeProvider theme={{}}>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
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
