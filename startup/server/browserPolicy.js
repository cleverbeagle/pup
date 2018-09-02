import { BrowserPolicy } from 'meteor/browser-policy-common';
// e.g., BrowserPolicy.content.allowOriginForAll( 's3.amazonaws.com' );
BrowserPolicy.content.allowOriginForAll('https://use.fontawesome.com/releases/v5.0.10/css/all.css');
BrowserPolicy.content.allowFontOrigin('data:');
BrowserPolicy.content.allowFontOrigin('https://use.fontawesome.com/');
