import React from 'react';
import { Row, Col, Alert, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import Validation from '../../components/Validation';
import AccountPageFooter from '../../components/AccountPageFooter';
import StyledRecoverPassword from './styles';

class RecoverPassword extends React.Component {
  handleSubmit = (form) => {
    const { history } = this.props;
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

  render() {
    return (
      <StyledRecoverPassword>
        <Row>
          <Col xs={12}>
            <h4 className="page-header">Recover Password</h4>
            <Alert bsStyle="info">
              Enter your email address below to receive a link to reset your password.
            </Alert>
            <Validation
              rules={{
                emailAddress: {
                  required: true,
                  email: true,
                },
              }}
              messages={{
                emailAddress: {
                  required: 'Need an email address here.',
                  email: 'Is this email address correct?',
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
                  />
                </FormGroup>
                <Button type="submit" bsStyle="success" block>
                  Recover Password
                </Button>
                <AccountPageFooter>
                  <p>
                    {'Remember your password? '}
                    <Link to="/login">Log In</Link>
                    {'.'}
                  </p>
                </AccountPageFooter>
              </form>
            </Validation>
          </Col>
        </Row>
      </StyledRecoverPassword>
    );
  }
}

RecoverPassword.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RecoverPassword;
