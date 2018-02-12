import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Icon from '../../components/Icon/Icon';

import './Logout.scss';

class Logout extends React.Component {
  componentDidMount() {
    Meteor.logout(() => this.props.setAfterLoginPath(null));
  }

  render() {
    return (
      <div className="Logout">
        <img
          src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
          alt="Clever Beagle"
        />
        <h1>Stay safe out there.</h1>
        <p>{'Don\'t forget to like and follow Clever Beagle elsewhere on the web:'}</p>
        <ul className="FollowUsElsewhere">
          <li><a href="https://facebook.com/cleverbeagle"><Icon icon="facebook-official" /></a></li>
          <li><a href="https://twitter.com/clvrbgl"><Icon icon="twitter" /></a></li>
          <li><a href="https://github.com/cleverbeagle"><Icon icon="github" /></a></li>
        </ul>
      </div>
    );
  }
}

Logout.propTypes = {
  setAfterLoginPath: PropTypes.func.isRequired,
};

export default Logout;
