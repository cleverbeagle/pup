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
        <NavDropdown eventKey={2} title="Admin" id="admin-nav-dropdown">
          <LinkContainer exact to="/admin/users">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
          <LinkContainer exact to="/admin/users/settings">
            <Nav.Link>User Settings</Nav.Link>
          </LinkContainer>
        </NavDropdown>
      )}
    </Nav>
    <Nav>
      <NavDropdown alignRight title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavDropdown.Item eventKey={3.1}>Profile</NavDropdown.Item>
        </LinkContainer>
        <Dropdown.Divider />
        <LinkContainer to="/logout">
          <NavDropdown.Item eventKey={3.2}>Logout</NavDropdown.Item>
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
