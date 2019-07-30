import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Validation from '../../components/Validation';
import OAuthLoginButtons from '../../components/OAuthLoginButtons';
import AccountPageFooter from '../../components/AccountPageFooter';
import { StyledLogin, LoginPromo } from './styles';

class Login extends React.Component {
  handleSubmit = (form) => {
    Meteor.loginWithPassword(form.emailAddress.value, form.password.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome back!', 'success');
      }
    });
  };

  render() {
    return (
      <StyledLogin>
        <LoginPromo>
          <header>
            <img
              src="http://cleverbeagle-assets.s3.amazonaws.com/graphics/pup-document-graphic.png"
              alt="Clever Beagle"
            />
            <h4>Introducing Documents</h4>
            <p>Keep track of your ideas, privately and publicly.</p>
          </header>
        </LoginPromo>
        <Row>
          <Col xs={12}>
            <h4 className="page-header">Log In</h4>
            <Row>
              <Col xs={12}>
                <OAuthLoginButtons
                  emailMessage={{
                    offset: 100,
                    text: 'Log In with an Email Address',
                  }}
                />
              </Col>
            </Row>
            <Validation
              rules={{
                emailAddress: {
                  required: true,
                  email: true,
                },
                password: {
                  required: true,
                },
              }}
              messages={{
                emailAddress: {
                  required: 'Need an email address here.',
                  email: 'Is this email address correct?',
                },
                password: {
                  required: 'Need a password here.',
                },
              }}
              submitHandler={(form) => {
                this.handleSubmit(form);
              }}
            >
              <form ref={(form) => (this.form = form)} onSubmit={(event) => event.preventDefault()}>
                <FormGroup>
                  <ControlLabel>Email Address</ControlLabel>
                  <input
                    type="email"
                    name="emailAddress"
                    className="form-control"
                    placeholder="Email Address"
                    data-test="emailAddress"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel className="clearfix">
                    <span className="pull-left">Password</span>
                    <Link className="pull-right" to="/recover-password">
                      Forgot password?
                    </Link>
                  </ControlLabel>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    data-test="password"
                  />
                </FormGroup>
                <Button type="submit" bsStyle="success" block>
                  Log In
                </Button>
                <AccountPageFooter>
                  <p>
                    {"Don't have an account? "}
                    <Link to="/signup">Sign Up</Link>
                    {'.'}
                  </p>
                </AccountPageFooter>
              </form>
            </Validation>
          </Col>
        </Row>
      </StyledLogin>
    );
  }
}

export default Login;
