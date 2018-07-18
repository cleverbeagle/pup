import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import OAuthLoginButtons from './component';

const services = [
  'facebook',
  'github',
  'google',
];

storiesOf('OAuthLoginButtons')
  .add('with 1 service', () => (
    <OAuthLoginButtons services={services.slice(0, 1)} />
  ))
  .add('with 2 services', () => (
    <OAuthLoginButtons services={services.slice(0, 2)} />
  ))
  .add('with 3 services', () => (
    <OAuthLoginButtons services={services} />
  ))
  .add('with emailMessage', () => (
    <OAuthLoginButtons services={services} emailMessage={{text: 'Some message', offset: 10}} />
  ));
