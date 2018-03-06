import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import styled from 'styled-components';
import { darken } from 'polished';
import Icon from '../Icon/Icon';

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
  facebook: <span><Icon icon="facebook-official" /> Log In with Facebook</span>,
  github: <span><Icon icon="github" /> Log In with GitHub</span>,
  google: <span><Icon icon="google" /> Log In with Google</span>,
};


const OAuthLoginButton = ({ className, service, callback }) => (
  <button
    className={`${className} OAuthLoginButton-${service}`}
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

const StyledOAuthLoginButton = styled(OAuthLoginButton)`
  display: block;
  width: 100%;
  padding: 10px 15px;
  border: none;
  background: ${props => props.theme.colors.grayLighther};
  border-radius: 3px;
  margin-top 10px;

  i {
    margin-right: 3px;
    font-size: 18px;
    position: relative;
    top: 1px;
  }

  &.OAuthLoginButton-facebook {
    background: ${props => props.theme.colors.facebook};
    color: #fff;

    &:hover {
      background: ${props => darken(0.05, props.theme.colors.facebook)};
    }
  }

  &.OAuthLoginButton-google {
    background: ${props => props.theme.colors.google};
    color: #fff;

    &:hover {
      background: ${props => darken(0.05, props.theme.colors.google)};
    }
  }

  &.OAuthLoginButton-github {
    background: ${props => props.theme.colors.github};
    color: #fff;

    &:hover {
      background: ${props => darken(0.05, props.theme.colors.github)};
    }
  }

  &:active {
    position: relative;
    top: 1px;
  }

  &:active,
  &:focus {
    outline: 0;
  }

  :first-child {
    margin-top: 0px;
  }
`;

OAuthLoginButton.propTypes = {
  className: PropTypes.node.isRequired,
  service: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

export default StyledOAuthLoginButton;
