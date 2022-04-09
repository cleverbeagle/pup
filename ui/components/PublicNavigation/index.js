import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';

const PublicNavigation = () => (
  <Nav className="justify-content-end">
    <LinkContainer to="/signup">
      <Nav.Item>
        <Nav.Link eventKey={1} href="/signup">
          Sign Up
        </Nav.Link>
      </Nav.Item>
    </LinkContainer>
    <LinkContainer to="/login">
      <Nav.Item>
        <Nav.Link eventKey={2} href="/login">
          Log In
        </Nav.Link>
      </Nav.Item>
    </LinkContainer>
  </Nav>
);

export default PublicNavigation;
