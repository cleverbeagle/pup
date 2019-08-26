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
        <Form onSubmit={(event) => event.preventDefault()}>
          {user && (
            <Row>
              <Col xs={12} lg={6}>
                {user && user.name && (
                  <Form.Row>
                    <Form.Group as={Col} xs={6}>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        disabled={user && user.oAuthProvider}
                        name="firstName"
                        defaultValue={user && user.name && user.name.first}
                      />
                    </Form.Group>
                    <Form.Group as={Col} xs={6}>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        disabled={user && user.oAuthProvider}
                        name="lastName"
                        defaultValue={user && user.name && user.name.last}
                      />
                    </Form.Group>
                  </Form.Row>
                )}
                {user && user.username && (
                  <Form.Row>
                    <Form.Group as={Col} xs={12}>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        disabled={user && user.oAuthProvider}
                        name="username"
                        defaultValue={user && user.username}
                      />
                    </Form.Group>
                  </Form.Row>
                )}
                <Form.Row>
                  <Form.Group as={Col} xs={12}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      disabled={user && user.oAuthProvider}
                      name="emailAddress"
                      autoComplete="off"
                      defaultValue={user && user.emailAddress}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} xs={12}>
                    <Form.Label>Roles</Form.Label>
                    <ListGroup>
                      {user.roles.map(({ _id, name, inRole }) => (
                        <ListGroupItem key={_id}>
                          <Form.Check
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
                </Form.Row>
                {user && !user.oAuthProvider && (
                  <Row>
                    <Form.Group as={Col} xs={12}>
                      <Form.Row className="justify-content-between no-gutters">
                        <Form.Label column>Password</Form.Label>
                        <Col>
                          <Form.Check
                            inline
                            checked={showPassword}
                            className="float-right p-2"
                            onChange={() =>
                              this.setState({
                                showPassword: !showPassword,
                              })
                            }
                            label="Show Password"
                          />
                        </Col>
                      </Form.Row>
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
                        <InputGroup.Prepend>
                          <Button variant="light" onClick={this.generatePassword}>
                            <Icon iconStyle="solid" icon="random" />
                            {' Generate'}
                          </Button>
                        </InputGroup.Prepend>
                      </InputGroup>
                      <InputHint>Use at least six characters.</InputHint>
                    </Form.Group>
                  </Row>
                )}
                <Button type="submit" variant="success">
                  {user ? 'Save Changes' : 'Create User'}
                </Button>
                {user && (
                  <Button variant="danger" className="float-right" onClick={this.handleDeleteUser}>
                    Delete User
                  </Button>
                )}
              </Col>
            </Row>
          )}
        </Form>
      </Validation>
    );
  }
}

AdminUserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default AdminUserProfile;
