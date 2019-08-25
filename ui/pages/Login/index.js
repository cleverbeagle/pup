import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import PageHeader from '../../components/PageHeader';
import Validation from '../../components/Validation';
import OAuthLoginButtons from '../../components/OAuthLoginButtons';
import AccountPageFooter from '../../components/AccountPageFooter';
import { StyledLogin, LoginPromo } from './styles';

const handleSubmit = (form) => {
  Meteor.loginWithPassword(form.emailAddress.value, form.password.value, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Welcome back!', 'success');
    }
  });
};

const validationProps = {
  rules: {
    emailAddress: {
      required: true,
      email: true,
    },
    password: {
      required: true,
    },
  },
  messages: {
    emailAddress: {
      required: 'Need an email address here.',
      email: 'Is this email address correct?',
    },
    password: {
      required: 'Need a password here.',
    },
  },
  submitHandler: (form) => {
    handleSubmit(form);
  },
};

const Login = () => (
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
        <PageHeader>
          <h4>Log In</h4>
        </PageHeader>
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
        <Validation {...validationProps}>
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                data-test="emailAddress"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label column className="clearfix px-0">
                <span className="float-left">Password</span>
                <Link className="float-right" to="/recover-password">
                  Forgot password?
                </Link>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                data-test="password"
              />
            </Form.Group>
            <Button type="submit" variant="success" block>
              Log In
            </Button>
            <AccountPageFooter>
              <p>
                {"Don't have an account? "}
                <Link to="/signup">Sign Up</Link>
                {'.'}
              </p>
            </AccountPageFooter>
          </Form>
        </Validation>
      </Col>
    </Row>
  </StyledLogin>
);

export default Login;
