import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { sendVerificationEmail as sendVerificationEmailMutation } from '../../mutations/Users.gql';
import Validation from '../../components/Validation';
import OAuthLoginButtons from '../../components/OAuthLoginButtons';
import InputHint from '../../components/InputHint';
import AccountPageFooter from '../../components/AccountPageFooter';
import StyledSignup from './styles';

class Signup extends React.Component {
  handleSubmit = (form) => {
    const { history, sendVerificationEmail } = this.props;

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
          sendVerificationEmail();
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
                    <FormGroup>
                      <ControlLabel>First Name</ControlLabel>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={6}>
                    <FormGroup>
                      <ControlLabel>Last Name</ControlLabel>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <ControlLabel>Email Address</ControlLabel>
                  <input
                    type="email"
                    name="emailAddress"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <InputHint>Use at least six characters.</InputHint>
                </FormGroup>
                <Button type="submit" bsStyle="success" block>
                  Sign Up
                </Button>
                <AccountPageFooter>
                  <p>
                    Already have an account?
                    <Link to="/login">Log In</Link>
                    {'.'}
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
  sendVerificationEmail: PropTypes.func.isRequired,
};

export default graphql(sendVerificationEmailMutation, {
  name: 'sendVerificationEmail',
})(Signup);
