import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';

const AuthenticatedNavigation = ({ name, history, userId }) => (
  <>
    <Nav className="mr-auto">
      <LinkContainer to="/documents">
        <Nav.Link eventKey={1} href="/documents">
          Documents
        </Nav.Link>
      </LinkContainer>
      {Roles.userIsInRole(userId, 'admin') && (
        <NavDropdown title="Admin" id="admin-nav-dropdown">
          <LinkContainer exact to="/admin/users">
            <Nav.Link eventKey={2.1} href="/admin/users">
              Users
            </Nav.Link>
          </LinkContainer>
          <LinkContainer exact to="/admin/users/settings">
            <Nav.Link eventKey={2.2} href="/admin/users/settings">
              User Settings
            </Nav.Link>
          </LinkContainer>
        </NavDropdown>
      )}
    </Nav>
    <Nav className="justify-content-end">
      <NavDropdown title={name} data-test="user-nav-dropdown" id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavDropdown.Item eventKey={2.1} href="/profile">
            Profile
          </NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey={2.2} onClick={() => history.push('/logout')}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};

export default withRouter(AuthenticatedNavigation);
