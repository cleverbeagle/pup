import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import styled from 'styled-components';

const handleResendVerificationEmail = (emailAddress) => {
  Meteor.call('users.sendVerificationEmail', (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(`Check ${emailAddress} for a verification link!`, 'success');
    }
  });
};

const VerifyEmailAlert = ({ className, userId, emailVerified, emailAddress }) => (
  userId && !emailVerified ? (
    <div className={className}>
      <Alert className="verify-email text-center">
        <p>Hey friend! Can you <strong>verify your email address</strong> ({emailAddress}) for us?
          <Button
            bsStyle="link"
            onClick={() => handleResendVerificationEmail(emailAddress)}
            href="#"
          >
            Re-send verification email
          </Button>
        </p>
      </Alert>
    </div>
  ) : null
);

const StyledVerifyEmailAlert = styled(VerifyEmailAlert)`
  .alert {
    margin-bottom: 0;
    padding: 0;
    border-top: none;
    border-bottom: 1px solid #e7e7e7;
    background: #fff;
    color: ${props => props.theme.colors.grayDark};
    border-radius: 0;

    p {
      padding: 19px;
    }

    .btn {
      padding: 0;
    }
  }
`;

VerifyEmailAlert.propTypes = {
  className: PropTypes.node.isRequired,
  userId: PropTypes.string.isRequired,
  emailVerified: PropTypes.bool.isRequired,
  emailAddress: PropTypes.string.isRequired,
};

export default StyledVerifyEmailAlert;
