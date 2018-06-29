import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Icon from '../Icon/Icon';

const StyledOAuthLoginButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  border: none;
  background: var(--gray-lighter);
  border-radius: 3px;

  i {
    margin-right: 3px;
    font-size: 18px;
    position: relative;
    top: 1px;
  }

  &.OAuthLoginButton-facebook {
    background: var(--facebook);
    color: #fff;

    &:hover { background: ${darken(0.05, '#3b5998')}; }
  }

  &.OAuthLoginButton-google {
    background: var(--google);
    color: #fff;

    &:hover { background: ${darken(0.05, '#ea4335')}; }
  }

  &.OAuthLoginButton-github {
    background: var(--github);
    color: #fff;

    &:hover { background: ${darken(0.05, '#333333')}; }
  }

  &:active {
    position: relative;
    top: 1px;
  }

  &:active,
  &:focus {
    outline: 0;
  }

  &:not(:last-child) {
    margin-top: 10px;
  }
`;

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
  }[service];

  return {
    facebook: Meteor.loginWithFacebook,
    github: Meteor.loginWithGithub,
    google: Meteor.loginWithGoogle,
  }[service](options, callback);
};

const serviceLabel = {
  facebook: <span><Icon iconStyle="brand" icon="facebook" /> Log In with Facebook</span>,
  github: <span><Icon iconStyle="brand" icon="github" /> Log In with GitHub</span>,
  google: <span><Icon iconStyle="brand" icon="google" /> Log In with Google</span>,
};

const OAuthLoginButton = ({ service, callback }) => (
  <StyledOAuthLoginButton
    className={`OAuthLoginButton OAuthLoginButton-${service}`}
    type="button"
    onClick={() => handleLogin(service, callback)}
  >
    {serviceLabel[service]}
  </StyledOAuthLoginButton>
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
