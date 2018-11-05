import { BrowserPolicy } from 'meteor/browser-policy-common';

// Bootstrap
BrowserPolicy.content.allowOriginForAll('*.bootstrapcdn.com');

// FontAwesome
BrowserPolicy.content.allowOriginForAll('use.fontawesome.com');

// Replace these with your own content URLs
BrowserPolicy.content.allowOriginForAll('cleverbeagle-assets.s3.amazonaws.com');
BrowserPolicy.content.allowOriginForAll('s3-us-west-2.amazonaws.com');
BrowserPolicy.content.allowFontOrigin('data:');
