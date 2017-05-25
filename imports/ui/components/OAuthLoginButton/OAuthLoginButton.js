import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import './OAuthLoginButton.scss';

const handleLogin = (service, options, callback) => {
  const defaultOptions = {
    facebook: {
      requestPermissions: ['email'],
      loginStyle: 'redirect',
    },
    google: {
      requestPermissions: ['email'],
      requestOfflineToken: true,
      loginStyle: 'redirect',
    },
    github: {
      requestPermissions: ['user:email'],
      loginStyle: 'redirect',
    },
  }[service];

  const defaultCallback = (error) => {
    if (error) Bert.alert(error.reason, 'danger');
  };

  return {
    facebook: Meteor.loginWithFacebook,
    google: Meteor.loginWithGoogle,
    github: Meteor.loginWithGithub,
  }[service](options || defaultOptions, callback || defaultCallback);
};

const serviceLabel = {
  facebook: <span><i className="fa fa-facebook" /> Log In with Facebook</span>,
  google: <span><i className="fa fa-google" /> Log In with Google</span>,
  github: <span><i className="fa fa-github" /> Log In with GitHub</span>,
};

const OAuthLoginButton = ({ service, options, callback }) => (
  <button
    className={`OAuthLoginButton OAuthLoginButton-${service}`}
    type="button"
    onClick={() => handleLogin(service, options, callback)}
  >
    {serviceLabel[service]}
  </button>
);

OAuthLoginButton.defaultProps = {
  options: PropTypes.object,
  callback: PropTypes.func,
};

OAuthLoginButton.propTypes = {
  service: PropTypes.string.isRequired,
  options: PropTypes.object,
  callback: PropTypes.func,
};

export default OAuthLoginButton;
