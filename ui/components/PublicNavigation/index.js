import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';

const PublicNavigation = () => (
  <Nav>
    <LinkContainer to="/signup">
      <Nav.Link>Sign Up</Nav.Link>
    </LinkContainer>
    <LinkContainer to="/login">
      <Nav.Link>Log In</Nav.Link>
    </LinkContainer>
  </Nav>
);

export default PublicNavigation;
