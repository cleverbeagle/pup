import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Icon from '../Icon/Icon';

import './OAuthLoginButton.scss';

const handleLogin = (service, callback) => {
  const options = {
    facebook: {
      requestPermissions: ['email'],
      loginStyle: 'popup',
    },
    github: {
      requestPermissions: ['user:email'],
      loginStyle: 'popup',
    },
    google: {
      requestPermissions: ['email', 'profile'],
      requestOfflineToken: true,
      loginStyle: 'popup',
    },
    twitter: {
      requestPermissions: ['email', 'profile'],
      requestOfflineToken: true,
      loginStyle: 'popup',
    },
  }[service];

  return {
    facebook: Meteor.loginWithFacebook,
    github: Meteor.loginWithGithub,
    google: Meteor.loginWithGoogle,
    twitter: Meteor.loginWithTwitter,
  }[service](options, callback);
};

const serviceLabel = {
  facebook: <span><Icon icon="facebook-official" /> Log In with Facebook</span>,
  github: <span><Icon icon="github" /> Log In with GitHub</span>,
  google: <span><Icon icon="google" /> Log In with Google</span>,
  twitter: <span><Icon icon="twitter" /> Log In with Twitter</span>,
};

const OAuthLoginButton = ({ service, callback }) => (
  <button
    className={`OAuthLoginButton OAuthLoginButton-${service}`}
    type="button"
    onClick={() => handleLogin(service, callback)}
  >
    {serviceLabel[service]}
  </button>
);

OAuthLoginButton.defaultProps = {
  callback: (error) => {
    if (error) Bert.alert(error.message, 'danger');
  },
};

OAuthLoginButton.propTypes = {
  service: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

export default OAuthLoginButton;
