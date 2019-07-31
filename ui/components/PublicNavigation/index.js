import React from 'react';
import { Nav } from 'react-bootstrap';

const PublicNavigation = () => (
  <Nav>
    <Nav.Item eventkey="/signup">
      <Nav.Link href="/signup">Sign up</Nav.Link>
    </Nav.Item>
    <Nav.Item eventkey="/login">
      <Nav.Link href="/login">Log in</Nav.Link>
    </Nav.Item>
  </Nav>
);

export default PublicNavigation;
