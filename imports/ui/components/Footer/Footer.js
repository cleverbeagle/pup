import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import styled, { injectGlobal } from 'styled-components';
import { year } from '../../../modules/dates';
import media from '../../stylesheets/style-utils';

/* eslint-disable no-unused-expressions */
injectGlobal`
  html {
    position: relative;
    min-height: 100%;
  }

  body {
    margin: 0;
  }
`;
/* eslint-enable no-unused-expressions */

const copyrightYear = () => {
  const currentYear = year();
  return currentYear === '2017' ? '2017' : `2017-${currentYear}`;
};

const Footer = ({ className }) => (
  <div className={className}>
    <Grid>
      <p className="pull-left">&copy; {copyrightYear()} Application Name</p>
      <ul className="pull-right">
        <li><Link to="/terms">Terms<span className="hidden-xs"> of Service</span></Link></li>
        <li><Link to="/privacy">Privacy<span className="hidden-xs"> Policy</span></Link></li>
      </ul>
    </Grid>
  </div>
);

const StyledFooter = styled(Footer)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid ${props => props.theme.colors.grayLighter};
  padding: 20px 0;

  p {
    color: ${props => props.theme.colors.grayLight};
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    float: left;

    &:first-child {
      margin-right: 30px;
    }

    a {
      color: ${props => props.theme.colors.grayLight};
    }

    a:hover,
    a:active,
    a:focus {
      text-decoration: none;
      color: ${props => props.theme.colors.gray};
    }
  }

  ${media.tablet`
    ul li:first-child {
    margin-right: 15px;
  `};
`;

Footer.propTypes = {
  className: PropTypes.node.isRequired,
};

export default StyledFooter;
