import React from 'react';
import { Row, Col, Alert, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import PageHeader from '../../components/PageHeader';
import Validation from '../../components/Validation';
import AccountPageFooter from '../../components/AccountPageFooter';
import StyledRecoverPassword from './styles';

const handleSubmit = (form, history) => {
  const email = form.emailAddress.value;

  Accounts.forgotPassword({ email }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(`Check ${email} for a reset link!`, 'success');
      history.push('/login');
    }
  });
};

const validationRules = {
  rules: {
    emailAddress: {
      required: true,
      email: true,
    },
  },
  messages: {
    emailAddress: {
      required: 'Need an email address here.',
      email: 'Is this email address correct?',
    },
  },
};

const RecoverPassword = ({ history }) => (
  <StyledRecoverPassword>
    <Row>
      <Col xs={12}>
        <PageHeader>
          <h4>Recover Password</h4>
        </PageHeader>
        <Alert variant="info">
          Enter your email address below to receive a link to reset your password.
        </Alert>
        <Validation
          {...validationRules}
          submitHandler={(form) => {
            handleSubmit(form, history);
          }}
        >
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="emailAddress" placeholder="Email Address" />
            </Form.Group>
            <Button type="submit" variant="success" block>
              Recover Password
            </Button>
            <AccountPageFooter>
              <p>
                {'Remember your password? '}
                <Link to="/login">Log In</Link>
                {'.'}
              </p>
            </AccountPageFooter>
          </Form>
        </Validation>
      </Col>
    </Row>
  </StyledRecoverPassword>
);

RecoverPassword.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RecoverPassword;
