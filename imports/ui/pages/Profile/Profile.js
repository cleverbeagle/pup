/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import FileSaver from 'file-saver';
import base64ToBlob from 'b64-to-blob';
import { Row, Col, FormGroup, ControlLabel, Button, Tabs, Tab } from 'react-bootstrap';
import _ from 'lodash';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';
import InputHint from '../../components/InputHint/InputHint';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import UserSettings from '../../components/UserSettings/UserSettings';
import validate from '../../../modules/validate';
import getUserProfile from '../../../modules/get-user-profile';

const StyledProfile = styled.div`
  .nav.nav-tabs {
    margin-bottom: 20px;
  }
  
  .LoggedInWith {
    padding: 20px;
    border-radius: 3px;
    color: #fff;
    border: 1px solid var(--gray-lighter);
    text-align: center;

    img {
      width: 100px;
    }

    &.github img {
      width: 125px;
    }

    p {
      margin: 20px 0 0 0;
      color: var(--gray-light);
    }

    .btn {
      margin-top: 20px;

      &.btn-facebook {
        background: var(--facebook);
        border-color: var(--facebook);
        color: #fff;
      }

      &.btn-google {
        background: var(--google);
        border-color: var(--google);
        color: #fff;
      }

      &.btn-github {
        background: var(--github);
        border-color: var(--github);
        color: #fff;
      }
    }
  }

  .btn-export {
    padding: 0;
  }
`;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
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
        currentPassword: {
          required() {
            // Only required if newPassword field has a value.
            return component.form.newPassword.value.length > 0;
          },
        },
        newPassword: {
          required() {
            // Only required if currentPassword field has a value.
            return component.form.currentPassword.value.length > 0;
          },
        },
      },
      messages: {
        firstName: {
          required: 'What\'s your first name?',
        },
        lastName: {
          required: 'What\'s your last name?',
        },
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        currentPassword: {
          required: 'Need your current password if changing.',
        },
        newPassword: {
          required: 'Need your new password if changing.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  getUserType(user) {
    return user.service === 'password' ? 'password' : 'oauth';
  }

  handleExportData(event) {
    event.preventDefault();
    Meteor.call('users.exportData', (error, exportData) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        FileSaver.saveAs(base64ToBlob(exportData), `${Meteor.userId()}.zip`);
      }
    });
  }

  handleDeleteAccount() {
    if (confirm('Are you sure? This will permanently delete your account and all of its data.')) {
      Meteor.call('users.deleteAccount', (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Account deleted!', 'success');
        }
      });
    }
  }

  handleSubmit(form) {
    const profile = {
      emailAddress: form.emailAddress.value,
      profile: {
        name: {
          first: form.firstName.value,
          last: form.lastName.value,
        },
      },
    };

    Meteor.call('users.editProfile', profile, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Profile updated!', 'success');
      }
    });

    if (form.newPassword.value) {
      Accounts.changePassword(form.currentPassword.value, form.newPassword.value, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          form.currentPassword.value = ''; // eslint-disable-line no-param-reassign
          form.newPassword.value = ''; // eslint-disable-line no-param-reassign
        }
      });
    }
  }

  renderOAuthUser(loading, user) {
    return !loading ? (
      <div className="OAuthProfile">
        <div key={user.service} className={`LoggedInWith ${user.service}`}>
          <img src={`/${user.service}.svg`} alt={user.service} />
          <p>{`You're logged in with ${_.capitalize(user.service)} using the email address ${user.emails[0].address}.`}</p>
          <Button
            className={`btn btn-${user.service}`}
            href={{
              facebook: 'https://www.facebook.com/settings',
              google: 'https://myaccount.google.com/privacy#personalinfo',
              github: 'https://github.com/settings/profile',
            }[user.service]}
            target="_blank"
          >
            Edit Profile on {_.capitalize(user.service)}
          </Button>
        </div>
      </div>) : <div />;
  }

  renderPasswordUser(loading, user) {
    return !loading ? (
      <div>
        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>First Name</ControlLabel>
              <input
                type="text"
                name="firstName"
                defaultValue={user.profile.name.first}
                className="form-control"
              />
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel>Last Name</ControlLabel>
              <input
                type="text"
                name="lastName"
                defaultValue={user.profile.name.last}
                className="form-control"
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <ControlLabel>Email Address</ControlLabel>
          <input
            type="email"
            name="emailAddress"
            defaultValue={user.emails[0].address}
            className="form-control"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Current Password</ControlLabel>
          <input
            type="password"
            name="currentPassword"
            className="form-control"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>New Password</ControlLabel>
          <input
            type="password"
            name="newPassword"
            className="form-control"
          />
          <InputHint>Use at least six characters.</InputHint>
        </FormGroup>
        <Button type="submit" bsStyle="success">Save Profile</Button>
      </div>
    ) : <div />;
  }

  renderProfileForm(loading, user) {
    return !loading ? ({
      password: this.renderPasswordUser,
      oauth: this.renderOAuthUser,
    }[this.getUserType(user)])(loading, user) : <div />;
  }

  render() {
    const { loading, user } = this.props;
    return (
      <StyledProfile>
        <h4 className="page-header">{user && user.profile ? `${user.profile.name.first} ${user.profile.name.last}` : user.username}</h4>
        <Tabs animation={false} defaultActiveKey={1} id="admin-user-tabs">
          <Tab eventKey={1} title="Profile">
            <Row>
              <Col xs={12} sm={6} md={4}>
                <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                  {this.renderProfileForm(loading, user)}
                </form>
                <AccountPageFooter>
                  <p><Button bsStyle="link" className="btn-export" onClick={this.handleExportData}>Export my data</Button> – Download all of your documents as .txt files in a .zip</p>
                </AccountPageFooter>
                <AccountPageFooter>
                  <Button bsStyle="danger" onClick={this.handleDeleteAccount}>Delete My Account</Button>
                </AccountPageFooter>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey={2} title="Settings">
            <UserSettings />
          </Tab>
        </Tabs>
      </StyledProfile>
    );
  }
}

Profile.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('users.editProfile');

  return {
    loading: !subscription.ready(),
    user: getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() })),
  };
})(Profile);
