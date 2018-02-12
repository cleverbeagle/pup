import React from 'react';
import autoBind from 'react-autobind';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';

class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
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
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    Meteor.loginWithPassword(form.emailAddress.value, form.password.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome back!', 'success');
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4}>
            <h4 className="page-header">Log In</h4>
            <Row>
              <Col xs={12}>
                <OAuthLoginButtons
                  services={['facebook', 'github', 'google']}
                  emailMessage={{
                    offset: 100,
                    text: 'Log In with an Email Address',
                  }}
                />
              </Col>
            </Row>
            <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              <FormGroup>
                <ControlLabel>Email Address</ControlLabel>
                <input
                  type="email"
                  name="emailAddress"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="clearfix">
                  <span className="pull-left">Password</span>
                  <Link className="pull-right" to="/recover-password">Forgot password?</Link>
                </ControlLabel>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success">Log In</Button>
              <AccountPageFooter>
                <p>{'Don\'t have an account?'} <Link to="/signup">Sign Up</Link>.</p>
              </AccountPageFooter>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
