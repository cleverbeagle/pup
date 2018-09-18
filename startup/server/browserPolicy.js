import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowOriginForAll(
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
);
BrowserPolicy.content.allowFontOrigin('https://maxcdn.bootstrapcdn.com/');

BrowserPolicy.content.allowOriginForAll('https://use.fontawesome.com/releases/v5.0.10/css/all.css');
BrowserPolicy.content.allowFontOrigin('data:');
BrowserPolicy.content.allowFontOrigin('https://use.fontawesome.com/');
