import React from 'react';
import PropTypes from 'prop-types';
import OAuthLoginButton from '../OAuthLoginButton';
import Styles from './styles';

const OAuthLoginButtons = ({ services, emailMessage }) => (services.length ? (
  <Styles.OAuthLoginButtons emailMessage={emailMessage}>
    {services.map(service => <OAuthLoginButton key={service} service={service} />)}
    {emailMessage &&
      <Styles.EmailMessage offset={emailMessage.offset}>
        {emailMessage.text}
      </Styles.EmailMessage>
    }
  </Styles.OAuthLoginButtons>
) : <div />);

OAuthLoginButtons.propTypes = {
  services: PropTypes.array.isRequired,
  emailMessage: PropTypes.object.isRequired,
};

export default OAuthLoginButtons;
