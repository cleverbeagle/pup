import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { Bert } from 'meteor/themeteorchef:bert';
import { sendVerificationEmail as sendVerificationEmailMutation } from '../../mutations/Users.gql';
import Styles from './styles';

const handleResendVerificationEmail = (emailAddress, sendVerificationEmail) => {
  sendVerificationEmail();
  Bert.alert(`Check ${emailAddress} for a verification link!`, 'success');
};

const VerifyEmailAlert = ({ userId, emailVerified, emailAddress, sendVerificationEmail }) => {
  return userId && !emailVerified ? (
    <Styles.VerifyEmailAlert>
      <Alert className="verify-email text-center">
        <p>
          {'Hey friend! Can you '}
          <strong>verify your email address</strong>
          {` (${emailAddress}) `}
          for us?
          <Button
            bsStyle="link"
            onClick={() => handleResendVerificationEmail(emailAddress, sendVerificationEmail)}
            href="#"
          >
            Re-send verification email
          </Button>
        </p>
      </Alert>
    </Styles.VerifyEmailAlert>
  ) : null;
};

VerifyEmailAlert.propTypes = {
  userId: PropTypes.string.isRequired,
  emailVerified: PropTypes.bool.isRequired,
  emailAddress: PropTypes.string.isRequired,
  sendVerificationEmail: PropTypes.func.isRequired,
};

export default graphql(sendVerificationEmailMutation, {
  name: 'sendVerificationEmail',
})(VerifyEmailAlert);
