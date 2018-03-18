import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { year } from '../../../modules/dates';

import './Footer.scss';

const { applicationName, copyrightStartYear } = Meteor.settings.public;
const copyrightYear = () => {
  const currentYear = year();
  return currentYear === copyrightStartYear ? copyrightStartYear : `${copyrightStartYear}-${currentYear}`;
};

const Footer = () => (
  <div className="Footer">
    <Grid>
      <p className="pull-left">&copy; {copyrightYear()} {applicationName}</p>
      <ul className="pull-right">
        <li><Link to="/terms">Terms<span className="hidden-xs"> of Service</span></Link></li>
        <li><Link to="/privacy">Privacy<span className="hidden-xs"> Policy</span></Link></li>
      </ul>
    </Grid>
  </div>
);

Footer.propTypes = {};

export default Footer;
