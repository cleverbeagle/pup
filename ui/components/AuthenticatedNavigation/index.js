import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';

const AuthenticatedNavigation = ({ name, history, userId }) => (
  <div>
    <Nav className="justify-content-end">
      <Nav.Item eventkey="/documents">
        <Nav.Link onClick={() => history.push('/documents')}>Documents</Nav.Link>
      </Nav.Item>
      {Roles.userIsInRole(userId, 'admin') && (
        <NavDropdown title="Admin" id="admin-nav-dropdown">
          <NavDropdown.Item eventkey="/admin/users/" onClick={() => history.push('/admin/users/')}>
            Users
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            eventkey="/admin/users/settings"
            onClick={() => history.push('/admin/users/settings')}
          >
            Settings
          </NavDropdown.Item>
        </NavDropdown>
      )}

      <NavDropdown eventkey={3} title={name} id="user-nav-dropdown">
        <NavDropdown.Item eventkey="/profile" onClick={() => history.push('/profile')}>
          Profile
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventkey="logout" onClick={() => history.push('/logout')}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};

export default withRouter(AuthenticatedNavigation);
