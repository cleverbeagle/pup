import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  FormLabel,
  FormGroup,
  ListGroup,
  ListGroupItem,
  FormCheck,
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { capitalize } from 'lodash';
import { Random } from 'meteor/random';
import InputHint from '../InputHint';
import Icon from '../Icon';

class AdminUserProfile extends React.Component {
  state = { showPassword: false, password: '', validated: false };

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (!form.checkValidity()) {
      this.setState({ validated: true });
      return;
    }

    const { user, updateUser } = this.props;
    const existingUser = user;
    const isPasswordUser = existingUser && !existingUser.oAuthProvider;
    const password = isPasswordUser ? form.password.value : null;
    const roleCheckboxes = document.querySelectorAll('[name="role"]:checked');
    const roles = [];
    [].forEach.call(roleCheckboxes, (role) => {
      roles.push(role.value);
    });

    let userUpdate;

    if (isPasswordUser) {
      userUpdate = {
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
      userUpdate = {
        roles,
      };
    }

    if (existingUser) userUpdate._id = existingUser._id;
    updateUser({ variables: { user: userUpdate } }, () => this.setState({ password: '' }));
  };

  handleDeleteUser = () => {
    const { removeUser, user } = this.props;
    if (confirm("Are you sure? This will permanently delete this user's account!")) {
      removeUser({
        variables: {
          _id: user._id,
        },
      });
    }
  };

  generatePassword = () => {
    this.setState({ password: Random.hexString(20) });
  };

  render() {
    const { user } = this.props;
    const { showPassword, password, validated } = this.state;

    return (
      <div className="AdminUserProfile" style={{ paddingTop: '1rem' }}>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          {user && (
            <Row>
              <Col xs={12} md={6}>
                {user && user.name && (
                  <Row>
                    <Col xs={6}>
                      <FormGroup>
                        <FormLabel>First Name</FormLabel>
                        <input
                          disabled={user && user.oAuthProvider}
                          type="text"
                          name="firstName"
                          className="form-control"
                          required
                          defaultValue={user && user.name && user.name.first}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          What's the user's first name?
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Col>
                    <Col xs={6}>
                      <FormGroup>
                        <FormLabel>Last Name</FormLabel>
                        <input
                          disabled={user && user.oAuthProvider}
                          type="text"
                          name="lastName"
                          className="form-control"
                          required
                          defaultValue={user && user.name && user.name.last}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          What's the user's last name?
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                {user && user.username && (
                  <Row>
                    <Col xs={12}>
                      <FormGroup>
                        <FormLabel>Username</FormLabel>
                        <input
                          disabled={user && user.oAuthProvider}
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
                      <FormLabel>Email Address</FormLabel>
                      <input
                        disabled={user && user.oAuthProvider}
                        type="email"
                        name="emailAddress"
                        autoComplete="off"
                        className="form-control"
                        required
                        defaultValue={user && user.emailAddress}
                      />
                      <Form.Control.Feedback type="invalid">
                        Need an email address here.
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <FormLabel>Roles</FormLabel>
                      <ListGroup>
                        {user.roles.map(({ _id, name, inRole }) => (
                          <ListGroupItem key={_id}>
                            <FormCheck
                              name="role"
                              value={name}
                              defaultChecked={inRole}
                              inline
                              label={capitalize(name)}
                            />
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </FormGroup>
                  </Col>
                </Row>
                {user && !user.oAuthProvider && (
                  <Row>
                    <Col xs={12}>
                      <FormGroup>
                        <FormLabel>
                          Password
                          <FormCheck
                            inline
                            checked={showPassword}
                            className="pull-right"
                            onChange={() =>
                              this.setState({
                                showPassword: !showPassword,
                              })
                            }
                          >
                            Show Password
                          </FormCheck>
                        </FormLabel>
                        <InputGroup>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="form-control"
                            autoComplete="off"
                            value={password}
                            minLength="6"
                            onChange={(event) => {
                              this.setState({ password: event.target.value });
                            }}
                          />
                          <InputGroup.Append>
                            <Button onClick={this.generatePassword} variant="outline-secondary">
                              <Icon iconStyle="solid" icon="refresh" />
                              {' Generate'}
                            </Button>
                          </InputGroup.Append>
                          <Form.Control.Feedback type="invalid">
                            Please use at least six characters.
                          </Form.Control.Feedback>
                        </InputGroup>
                        <InputHint>Use at least six characters.</InputHint>
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                <Button type="submit" variant="success">
                  {user ? 'Save Changes' : 'Create User'}
                </Button>
                {user && (
                  <Button variant="danger" className="pull-right" onClick={this.handleDeleteUser}>
                    Delete User
                  </Button>
                )}
              </Col>
            </Row>
          )}
        </Form>
      </div>
    );
  }
}

AdminUserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default AdminUserProfile;
