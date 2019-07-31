import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import Validation from '../../components/Validation';
import OAuthLoginButtons from '../../components/OAuthLoginButtons';
import InputHint from '../../components/InputHint';
import AccountPageFooter from '../../components/AccountPageFooter';
import StyledSignup from './styles';

class Signup extends React.Component {
  handleSubmit = (form) => {
    const { history } = this.props;

    Accounts.createUser(
      {
        email: form.emailAddress.value,
        password: form.password.value,
        profile: {
          name: {
            first: form.firstName.value,
            last: form.lastName.value,
          },
        },
      },
      (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Meteor.call('users.sendVerificationEmail');
          Bert.alert('Welcome!', 'success');
          history.push('/documents');
        }
      },
    );
  };

  render() {
    return (
      <StyledSignup>
        <Row>
          <Col xs={12}>
            <h4 className="page-header">Sign Up</h4>
            <Row>
              <Col xs={12}>
                <OAuthLoginButtons
                  services={['facebook', 'github', 'google']}
                  emailMessage={{
                    offset: 97,
                    text: 'Sign Up with an Email Address',
                  }}
                />
              </Col>
            </Row>
            <Validation
              rules={{
                firstName: {
                  required: true,
                },
                lastName: {
                  required: true,
                },
                emailAddress: {
                  required: true,
                  email: true,
                },
                password: {
                  required: true,
                  minlength: 6,
                },
              }}
              messages={{
                firstName: {
                  required: "What's your first name?",
                },
                lastName: {
                  required: "What's your last name?",
                },
                emailAddress: {
                  required: 'Need an email address here.',
                  email: 'Is this email address correct?',
                },
                password: {
                  required: 'Need a password here.',
                  minlength: 'Please use at least six characters.',
                },
              }}
              submitHandler={(form) => {
                this.handleSubmit(form);
              }}
            >
              <form ref={(form) => (this.form = form)} onSubmit={(event) => event.preventDefault()}>
                <Row>
                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" name="firstName" placeholder="First Name" />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" name="lastName" placeholder="Last Name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="emailAddress" placeholder="Email Address" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" />
                  <InputHint>Use at least six characters.</InputHint>
                </Form.Group>
                <Button type="submit" variant="success" block>
                  Sign Up
                </Button>
                <AccountPageFooter>
                  <p>
                    Already have an account? <Link to="/login">Log In</Link>.
                  </p>
                </AccountPageFooter>
              </form>
            </Validation>
          </Col>
        </Row>
      </StyledSignup>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Signup;
