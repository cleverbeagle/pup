import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PublicNavigation from '../PublicNavigation/PublicNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';

const Navigation = props => (
  <Navbar className={props.className}>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Pup</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {!props.authenticated ? <PublicNavigation /> : <AuthenticatedNavigation {...props} />}
    </Navbar.Collapse>
  </Navbar>
);

Navigation.defaultProps = {
  name: '',
};

const StyledNavigation = styled(Navigation)`
  border-radius: 0;
  border-left: none;
  border-right: none;
  border-top: none;
`;

Navigation.propTypes = {
  className: PropTypes.node.isRequired,
  authenticated: PropTypes.bool.isRequired,
  name: PropTypes.string,
};

export default StyledNavigation;
