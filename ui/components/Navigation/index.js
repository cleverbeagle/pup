import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import PublicNavigation from '../PublicNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation';

const Navigation = (props) => {
  const { authenticated } = props;
  return (
    <Navbar collapseOnSelect bg="light">
      <Navbar.Brand href="/">{Meteor.settings.public.productName}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {!authenticated ? <PublicNavigation /> : <AuthenticatedNavigation {...props} />}
      </Navbar.Collapse>
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
