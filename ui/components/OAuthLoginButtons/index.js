import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import OAuthLoginButton from '../OAuthLoginButton';
import oAuthServicesQuery from '../../queries/OAuth.gql';
import Styles from './styles';

const OAuthLoginButtons = ({ services, emailMessage }) =>
  services.length ? (
    <Styles.OAuthLoginButtons emailMessage={emailMessage}>
      {services.map((service) => (
        <OAuthLoginButton key={service} service={service} />
      ))}
      {emailMessage && (
        <Styles.EmailMessage offset={emailMessage.offset}>{emailMessage.text}</Styles.EmailMessage>
      )}
    </Styles.OAuthLoginButtons>
  ) : (
    <div />
  );

OAuthLoginButtons.propTypes = {
  services: PropTypes.array.isRequired,
  emailMessage: PropTypes.object.isRequired,
};

export default graphql(oAuthServicesQuery, {
  options: ({ services }) => ({
    variables: {
      services,
    },
  }),
})(OAuthLoginButtons);
