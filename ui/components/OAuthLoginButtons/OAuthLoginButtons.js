import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import OAuthLoginButton from '../OAuthLoginButton';

const StyledOAuthLoginButtons = styled.div`
  margin-bottom: 25px;

  ${props => (props.emailMessage ? `
    position: relative;
    border-bottom: 1px solid var(--gray-lighter);
    padding-bottom: 30px;
    margin-bottom: 30px;
  ` : '')}
`;

const EmailMessage = styled.p`
  display: inline-block;
  background: #fff;
  padding: 0 10px;
  position: absolute;
  bottom: -19px;
  left: 50%;
  margin-left: -${props => props.offset}px;
`;

const OAuthLoginButtons = ({ services, emailMessage }) => (services.length ? (
  <StyledOAuthLoginButtons emailMessage={emailMessage}>
    {services.map(service => <OAuthLoginButton key={service} service={service} />)}
    {emailMessage &&
      <EmailMessage offset={emailMessage.offset}>
        {emailMessage.text}
      </EmailMessage>
    }
  </StyledOAuthLoginButtons>
) : <div />);

OAuthLoginButtons.propTypes = {
  services: PropTypes.array.isRequired,
  emailMessage: PropTypes.object.isRequired,
};

const verificationComplete = new ReactiveVar(false);
const verifiedServices = new ReactiveVar([]);

export default withTracker(({ services }) => {
  if (!verificationComplete.get()) {
    Meteor.call('oauth.verifyConfiguration', services, (error, response) => {
      if (error) {
        console.warn(error);
      } else {
        verifiedServices.set(response);
        verificationComplete.set(true);
      }
    });
  }

  return {
    services: verifiedServices.get(),
  };
})(OAuthLoginButtons);
