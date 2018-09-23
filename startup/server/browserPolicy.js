import { BrowserPolicy } from 'meteor/browser-policy-common';

// Bootstrap
BrowserPolicy.content.allowOriginForAll(
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
);
BrowserPolicy.content.allowFontOrigin('https://maxcdn.bootstrapcdn.com/');

// FontAwesome
BrowserPolicy.content.allowOriginForAll('https://use.fontawesome.com/releases/v5.0.10/css/all.css');
BrowserPolicy.content.allowFontOrigin('https://use.fontawesome.com/');

// Replace these with your own content URLs
BrowserPolicy.content.allowOriginForAll('http://cleverbeagle-assets.s3.amazonaws.com/');
BrowserPolicy.content.allowFontOrigin('data:');
