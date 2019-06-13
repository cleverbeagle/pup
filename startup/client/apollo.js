/* eslint-disable no-underscore-dangle */

import { Meteor } from 'meteor/meteor';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MeteorAccountsLink } from 'meteor/apollo';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, location, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const queryOrMutationLink = () =>
  // NOTE: createPersistedQueryLink ensures that queries are cached if they have not
  // changed (reducing unnecessary load on the client).
  new HttpLink({
    uri: Meteor.settings.public.graphQL.httpUri,
    credentials: 'same-origin',
  });

const apolloClient = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
    MeteorAccountsLink(),
    errorLink,
    ApolloLink.split(
      // NOTE: Efficiently routes GraphQL requests based on type. Here, we split between a
      // query/mutation request (HTTP) and a subscription request (Websockets).
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      queryOrMutationLink(),
    ),
  ]),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

export default apolloClient;
