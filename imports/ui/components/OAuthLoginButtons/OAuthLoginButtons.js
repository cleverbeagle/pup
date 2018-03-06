import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import styled from 'styled-components';
import OAuthLoginButton from '../OAuthLoginButton/OAuthLoginButton';

const OAuthLoginButtons = ({ className, services, emailMessage }) => (services.length ? (
  <div className={`${className} ${emailMessage ? 'WithEmailMessage' : ''}`}>
    {services.map(service => <OAuthLoginButton key={service} service={service} />)}
    {emailMessage ?
      <p className="EmailMessage" style={{ marginLeft: `-${emailMessage.offset}px` }}>
        {emailMessage.text}
      </p> : ''}
  </div>
) : <div />);

const StyledOAuthLoginButtons = styled(OAuthLoginButtons)`
  margin-bottom: 25px;

  &.WithEmailMessage {
    position: relative;
    border-bottom: 1px solid ${props => props.theme.colors.grayLighter};
    padding-bottom: 30px;

    .EmailMessage {
      display: inline-block;
      background: #fff;
      padding: 0 10px;
      position: absolute;
      bottom: -19px;
      left: 50%;
    }
  }
`;

OAuthLoginButtons.propTypes = {
  className: PropTypes.node.isRequired,
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
})(StyledOAuthLoginButtons);
