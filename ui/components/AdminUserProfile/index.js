import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, ListGroup, ListGroupItem, InputGroup, Button } from 'react-bootstrap';
import { capitalize } from 'lodash';
import { Random } from 'meteor/random';
import InputHint from '../InputHint';
import Icon from '../Icon';
import Validation from '../Validation';

class AdminUserProfile extends React.Component {
  state = { showPassword: false, password: '' };

  handleSubmit = (form) => {
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
    const { showPassword, password } = this.state;

    return (
      <div className="AdminUserProfile">
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
              minlength: 6,
            },
          }}
          messages={{
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
          }}
          submitHandler={(form) => this.handleSubmit(form)}
        >
          <form ref={(form) => (this.form = form)} onSubmit={(event) => event.preventDefault()}>
            {user && (
              <Row>
                <Col xs={12} md={6}>
                  {user && user.name && (
                    <Row>
                      <Col xs={6}>
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            disabled={user && user.oAuthProvider}
                            type="text"
                            name="firstName"
                            defaultValue={user && user.name && user.name.first}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={6}>
                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            disabled={user && user.oAuthProvider}
                            type="text"
                            name="lastName"
                            defaultValue={user && user.name && user.name.last}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                  {user && user.username && (
                    <Row>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            disabled={user && user.oAuthProvider}
                            type="text"
                            name="username"
                            defaultValue={user && user.username}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          disabled={user && user.oAuthProvider}
                          type="text"
                          name="emailAddress"
                          autoComplete="off"
                          defaultValue={user && user.emailAddress}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Roles</Form.Label>
                        <ListGroup>
                          {user.roles.map(({ _id, name, inRole }) => (
                            <ListGroupItem key={_id}>
                              <Form.Check
                                type="checkbox"
                                name="role"
                                value={name}
                                defaultChecked={inRole}
                                inline
                                label={capitalize(name)}
                              />
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  {user && !user.oAuthProvider && (
                    <Row>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label>
                            Password
                            <Form.Check
                              inline
                              checked={showPassword}
                              className="pull-right"
                              label="Show Password"
                              type="checkbox"
                              onChange={() =>
                                this.setState({
                                  showPassword: !showPassword,
                                })
                              }
                            />
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              autoComplete="off"
                              value={password}
                              onChange={(event) => {
                                this.setState({ password: event.target.value });
                              }}
                            />
                            <InputGroup.Append>
                              <Button onClick={this.generatePassword}>
                                <Icon iconStyle="solid" icon="refresh" />
                                Generate
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                          <InputHint>Use at least six characters.</InputHint>
                        </Form.Group>
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
          </form>
        </Validation>
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
