import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';
import PublicNavigation from '../PublicNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation';

const Navigation = (props) => {
  const { authenticated } = props;
  return (
    <Navbar collapseOnSelect bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>{Meteor.settings.public.productName}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={!authenticated && 'justify-content-end'}>
          {authenticated ? <AuthenticatedNavigation {...props} /> : <PublicNavigation {...props} />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Navigation.defaultProps = {
  name: '',
};

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  name: PropTypes.string,
};

export default Navigation;
