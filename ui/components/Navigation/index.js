import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import PublicNavigation from '../PublicNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation';

const Navigation = (props) => {
  const { authenticated } = props;
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container>
        <Link to="/">
          <Navbar.Brand>{Meteor.settings.public.productName}</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {!authenticated ? <PublicNavigation /> : <AuthenticatedNavigation {...props} />}
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
