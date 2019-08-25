import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import PageHeader from '../../components/PageHeader';
import Validation from '../../components/Validation';
import AccountPageFooter from '../../components/AccountPageFooter';
import StyledResetPassword from './styles';

const handleSubmit = (form, match, history) => {
  const { token } = match.params;

  Accounts.resetPassword(token, form.newPassword.value, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      history.push('/documents');
    }
  });
};

const validationRules = {
  rules: {
    newPassword: {
      required: true,
      minlength: 6,
    },
    repeatNewPassword: {
      required: true,
      minlength: 6,
      equalTo: '[name="newPassword"]',
    },
  },
  messages: {
    newPassword: {
      required: 'Enter a new password, please.',
      minlength: 'Use at least six characters, please.',
    },
    repeatNewPassword: {
      required: 'Repeat your new password, please.',
      equalTo: "Hmm, your passwords don't match. Try again?",
    },
  },
};

const ResetPassword = ({ match, history }) => (
  <StyledResetPassword>
    <Row>
      <Col xs={12}>
        <PageHeader>
          <h4>Reset Password</h4>
        </PageHeader>
        <Alert variant="info">
          To reset your password, enter a new one below. You will be logged in with your new
          password.
        </Alert>
        <Validation
          {...validationRules}
          submitHandler={(form) => {
            handleSubmit(form, match, history);
          }}
        >
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" name="newPassword" placeholder="New Password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Repeat New Password</Form.Label>
              <Form.Control
                type="password"
                name="repeatNewPassword"
                placeholder="Repeat New Password"
              />
            </Form.Group>
            <Button type="submit" variant="success" block>
              Reset Password &amp; Login
            </Button>
            <AccountPageFooter>
              <p>
                {"Not sure why you're here? "}
                <Link to="/login">Log In</Link>
                {'.'}
              </p>
            </AccountPageFooter>
          </Form>
        </Validation>
      </Col>
    </Row>
  </StyledResetPassword>
);

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ResetPassword;
