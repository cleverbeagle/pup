import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';

const AuthenticatedNavigation = ({ name, history, userId }) => (
  <div>
    <Nav>
      <LinkContainer to="/documents">
        <NavItem eventKey={1} href="/documents">
          Documents
        </NavItem>
      </LinkContainer>
      {Roles.userIsInRole(userId, 'admin') && (
        <NavDropdown eventKey={2} title="Admin" id="admin-nav-dropdown">
          <LinkContainer exact to="/admin/users">
            <NavItem eventKey={2.1} href="/admin/users">
              Users
            </NavItem>
          </LinkContainer>
          <LinkContainer exact to="/admin/users/settings">
            <NavItem eventKey={2.2} href="/admin/users/settings">
              User Settings
            </NavItem>
          </LinkContainer>
        </NavDropdown>
      )}
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={2} title={name} data-test="user-nav-dropdown" id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={2.1} href="/profile">
            Profile
          </NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={2.2} onClick={() => history.push('/logout')}>
          Logout
        </MenuItem>
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
