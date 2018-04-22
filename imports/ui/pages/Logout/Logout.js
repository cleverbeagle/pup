import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Icon from '../../components/Icon/Icon';

import './Logout.scss';

const { productName, twitterUsername, facebookUsername } = Meteor.settings.public;

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
        <p>{`Don't forget to like and follow ${productName} elsewhere on the web`}</p>
        <ul className="FollowUsElsewhere">
          <li><a href={`https://facebook.com/${facebookUsername}?utm_source=app&utm_medium=referral&utm_campaign=logoutPage`}><Icon icon="facebook-official" /></a></li>
          <li><a href={`https://twitter.com/${twitterUsername}?utm_source=app&utm_medium=referral&utm_campaign=logoutPage`}><Icon icon="twitter" /></a></li>
        </ul>
      </div>
    );
  }
}

Logout.propTypes = {
  setAfterLoginPath: PropTypes.func.isRequired,
};

export default Logout;
