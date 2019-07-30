import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Alert } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { sendWelcomeEmail as sendWelcomeEmailMutation } from '../../mutations/Users.gql';

class VerifyEmail extends React.Component {
  state = { error: null };

  componentDidMount() {
    const { match, history, sendWelcomeEmail } = this.props;
    Accounts.verifyEmail(match.params.token, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
        this.setState({ error: `${error.reason}. Please try again.` });
      } else {
        setTimeout(() => {
          Bert.alert('All set, thanks!', 'success');
          sendWelcomeEmail();
          history.push('/documents');
        }, 1500);
      }
    });
  }

  render() {
    const { error } = this.state;
    return (
      <div className="VerifyEmail">
        <Alert bsStyle={!error ? 'info' : 'danger'}>{!error ? 'Verifying...' : error}</Alert>
      </div>
    );
  }
}

VerifyEmail.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  sendWelcomeEmail: PropTypes.func.isRequired,
};

export default graphql(sendWelcomeEmailMutation, {
  name: 'sendWelcomeEmail',
})(VerifyEmail);
