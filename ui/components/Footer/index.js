import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { year } from '../../../modules/dates';

import StyledFooter from './styles';

const { productName, copyrightStartYear } = Meteor.settings.public;
const copyrightYear = () => {
  const currentYear = year();
  return currentYear === copyrightStartYear
    ? copyrightStartYear
    : `${copyrightStartYear}-${currentYear}`;
};

const Footer = () => (
  <StyledFooter>
    <Grid>
      <p className="pull-left">
        &copy;
        {` ${copyrightYear()} ${productName}`}
      </p>
      <ul className="pull-right">
        <li>
          <Link to="/terms">
            Terms
            <span className="hidden-xs"> of Service</span>
          </Link>
        </li>
        <li>
          <Link to="/privacy">
            Privacy
            <span className="hidden-xs"> Policy</span>
          </Link>
        </li>
      </ul>
    </Grid>
  </StyledFooter>
);

Footer.propTypes = {};

export default Footer;
