import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';

const AuthenticatedNavigation = ({ name, userId }) => (
  <>
    <Nav className="mr-auto">
      <LinkContainer to="/documents">
        <Nav.Link>Documents</Nav.Link>
      </LinkContainer>
      {Roles.userIsInRole(userId, 'admin') && (
        <NavDropdown title="Admin" id="admin-nav-dropdown">
          <LinkContainer exact to="/admin/users">
            <NavDropdown.Item eventKey="/admin/users">Users</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer exact to="/admin/users/settings">
            <NavDropdown.Item eventKey="/admin/users/settings">User Settings</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      )}
    </Nav>
    <Nav>
      <NavDropdown alignRight title={name} id="user-nav-dropdown" data-test="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavDropdown.Item eventKey="/profile">Profile</NavDropdown.Item>
        </LinkContainer>
        <Dropdown.Divider />
        <LinkContainer to="/logout">
          <NavDropdown.Item eventKey="/logout">Logout</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    </Nav>
  </>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default withRouter(AuthenticatedNavigation);
