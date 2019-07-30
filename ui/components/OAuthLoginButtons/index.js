import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import OAuthLoginButton from '../OAuthLoginButton';
import Loading from '../Loading';
import oAuthServicesQuery from '../../queries/OAuth.gql';
import Styles from './styles';

const OAuthLoginButtons = ({ emailMessage, data: { oAuthServices, loading } }) => (
  <React.Fragment>
    {loading ? (
      <Loading />
    ) : (
      <React.Fragment>
        {oAuthServices.length ? (
          <Styles.OAuthLoginButtons emailMessage={emailMessage}>
            {oAuthServices.map((service) => (
              <OAuthLoginButton key={service} service={service} />
            ))}
            {emailMessage && (
              <Styles.EmailMessage offset={emailMessage.offset}>
                {emailMessage.text}
              </Styles.EmailMessage>
            )}
          </Styles.OAuthLoginButtons>
        ) : (
          <React.Fragment />
        )}
      </React.Fragment>
    )}
  </React.Fragment>
);

OAuthLoginButtons.propTypes = {
  data: PropTypes.object.isRequired,
  emailMessage: PropTypes.object.isRequired,
};

export default graphql(oAuthServicesQuery, {
  options: ({ services }) => ({
    variables: {
      services,
    },
  }),
})(OAuthLoginButtons);
