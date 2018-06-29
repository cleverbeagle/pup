import React from 'react';
import { renderToString } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App/App';
import mainReducer from '../../modules/redux/reducers';
import parseUrlForSSR from '../../modules/parse-url-for-ssr';

onPageLoad((sink) => {
  const documentURL = parseUrlForSSR(sink.request.url, 'documents');

  const context = {};
  const data = {
    loading: true,
    loggingIn: false,
    authenticated: false,
    name: '',
    roles: [],
    userId: null,
    emailAddress: '',
    emailVerified: false,
    doc: documentURL.isMatch ? Meteor.call('documents.findOne', documentURL.parts[1]) : '',
  };

  const store = createStore(mainReducer, data, applyMiddleware(thunk));
  const initialData = store.getState();
  const stylesheet = new ServerStyleSheet();

  const app = renderToString(stylesheet.collectStyles( // eslint-disable-line
    <Provider store={store}>
      <StaticRouter location={sink.request.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>));

  const helmet = Helmet.renderStatic();
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());
  sink.appendToHead(stylesheet.getStyleTags());

  sink.renderIntoElementById('react-root', app);

  sink.appendToBody(`
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(initialData).replace(/</g, '\\u003c')}
    </script>
  `);
});
