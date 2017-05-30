import React from 'react';

import './Logout.scss';

const Logout = () => (
  <div className="Logout">
    <img
      src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
      alt="Clever Beagle"
    />
    <h1>Stay safe out there.</h1>
    <p>{'Don\'t forget to like and follow Clever Beagle elsewhere on the web:'}</p>
    <ul className="FollowUsElsewhere">
      <li><a href="https://facebook.com/cleverbeagle"><i className="fa fa-facebook-official" /></a></li>
      <li><a href="https://twitter.com/clvrbgl"><i className="fa fa-twitter" /></a></li>
      <li><a href="https://github.com/cleverbeagle"><i className="fa fa-github" /></a></li>
    </ul>
  </div>
);

Logout.propTypes = {};

export default Logout;
