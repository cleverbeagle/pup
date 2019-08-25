import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { year } from '../../../modules/dates';
import Styles from './styles';

const { productName, copyrightStartYear } = Meteor.settings.public;
const copyrightYear = () => {
  const currentYear = year();
  return currentYear === copyrightStartYear
    ? copyrightStartYear
    : `${copyrightStartYear}-${currentYear}`;
};

const Footer = () => (
  <Styles.Footer>
    <Container>
      <p className="float-left">
        &copy;
        {` ${copyrightYear()} ${productName}`}
      </p>
      <ul className="float-right">
        <li>
          <Link to="/terms">
            Terms
            <span className="d-none d-sm-block"> of Service</span>
          </Link>
        </li>
        <li>
          <Link to="/privacy">
            Privacy
            <span className="d-none d-sm-block"> Policy</span>
          </Link>
        </li>
      </ul>
    </Container>
  </Styles.Footer>
);

Footer.propTypes = {};

export default Footer;
