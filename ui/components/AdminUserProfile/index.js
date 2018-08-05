import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  ControlLabel,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Checkbox,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { capitalize } from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Random } from 'meteor/random';
import InputHint from '../InputHint';
import Icon from '../Icon';
import validate from '../../../modules/validate';

class AdminUserProfile extends React.Component {
  state = { showPassword: false, password: '' };

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
        password: {
          minlength: 6,
        },
      },
      messages: {
        firstName: {
          required: "What's the user's first name?",
        },
        lastName: {
          required: "What's the user's last name?",
        },
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          minlength: 'Please use at least six characters.',
        },
      },
      submitHandler() {
        component.handleSubmit(component.form);
      },
    });
  }

  handleSubmit = (form) => {
    const existingUser = this.props.user;
    const isPasswordUser = (existingUser && existingUser.service === 'password') || !existingUser;
    const method = existingUser ? 'edit' : 'create';
    const password = isPasswordUser ? form.password.value : null;
    const roleCheckboxes = document.querySelectorAll('[name="role"]:checked');
    const roles = [];
    [].forEach.call(roleCheckboxes, (role) => {
      roles.push(role.value);
    });

    let user;

    if (isPasswordUser) {
      user = {
        email: form.emailAddress.value,
        password,
        profile: {
          name: {
            first: form.firstName.value,
            last: form.lastName.value,
          },
        },
        roles,
      };
    }

    if (!isPasswordUser) {
      user = {
        roles,
      };
    }

    if (existingUser) user._id = existingUser._id;

    Meteor.call(`admin.${method}User`, user, (error, newUserId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        if (method === 'create') this.props.history.push(`/admin/users/${newUserId}`);
        Bert.alert(method === 'edit' ? 'User updated!' : 'User created!', 'success');
        if (this.password) this.setState({ password: '' });
      }
    });
  };

  handleDeleteUser = () => {
    if (confirm("Are you sure? This will permanently delete this user's account!")) {
      Meteor.call('users.deleteAccount', this.props.user._id, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('User deleted!', 'success');
          this.props.history.push('/admin/users');
        }
      });
    }
  };

  generatePassword = () => {
    this.setState({ password: Random.hexString(20) });
  };

  render() {
    const { loading, user, roles } = this.props;
    return (
      <div className="AdminUserProfile">
        <form ref={(form) => (this.form = form)} onSubmit={(event) => event.preventDefault()}>
          {!loading && (
            <Row>
              <Col xs={12} md={6}>
                {user &&
                  user.profile &&
                  user.profile.name && (
                    <Row>
                      <Col xs={6}>
                        <FormGroup>
                          <ControlLabel>First Name</ControlLabel>
                          <input
                            disabled={user && user.service !== 'password'}
                            type="text"
                            name="firstName"
                            className="form-control"
                            defaultValue={user && user.profile && user.profile.name.first}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={6}>
                        <FormGroup>
                          <ControlLabel>Last Name</ControlLabel>
                          <input
                            disabled={user && user.service !== 'password'}
                            type="text"
                            name="lastName"
                            className="form-control"
                            defaultValue={user && user.profile && user.profile.name.last}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                {user &&
                  user.username && (
                    <Row>
                      <Col xs={12}>
                        <FormGroup>
                          <ControlLabel>Username</ControlLabel>
                          <input
                            disabled={user && user.service !== 'password'}
                            type="text"
                            name="username"
                            className="form-control"
                            defaultValue={user && user.username}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>Email Address</ControlLabel>
                      <input
                        disabled={user && user.service !== 'password'}
                        type="text"
                        name="emailAddress"
                        autoComplete="off"
                        className="form-control"
                        defaultValue={user && user.emails && user.emails[0].address}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <ControlLabel>Roles</ControlLabel>
                      <ListGroup>
                        {roles.map(({ _id, name, inRole }) => (
                          <ListGroupItem key={_id}>
                            <Checkbox name="role" value={name} defaultChecked={inRole} inline>
                              {capitalize(name)}
                            </Checkbox>
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </FormGroup>
                  </Col>
                </Row>
                {user &&
                  user.service === 'password' && (
                    <Row>
                      <Col xs={12}>
                        <FormGroup>
                          <ControlLabel>
                            Password
                            <Checkbox
                              inline
                              checked={this.state.showPassword}
                              className="pull-right"
                              onChange={() =>
                                this.setState({
                                  showPassword: !this.state.showPassword,
                                })
                              }
                            >
                              Show Password
                            </Checkbox>
                          </ControlLabel>
                          <InputGroup>
                            <input
                              type={this.state.showPassword ? 'text' : 'password'}
                              name="password"
                              className="form-control"
                              autoComplete="off"
                              value={this.state.password}
                              onChange={(event) => this.setState({ password: event.target.value })}
                            />
                            <InputGroup.Button>
                              <Button onClick={this.generatePassword}>
                                <Icon iconStyle="solid" icon="refresh" /> Generate
                              </Button>
                            </InputGroup.Button>
                          </InputGroup>
                          <InputHint>Use at least six characters.</InputHint>
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                <Button type="submit" bsStyle="success">
                  {user ? 'Save Changes' : 'Create User'}
                </Button>
                {user && (
                  <Button bsStyle="danger" className="pull-right" onClick={this.handleDeleteUser}>
                    Delete User
                  </Button>
                )}
              </Col>
            </Row>
          )}
        </form>
      </div>
    );
  }
}

AdminUserProfile.propTypes = {
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
};

export default AdminUserProfile;
