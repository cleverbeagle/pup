import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import { Meteor } from 'meteor/meteor';
import Icon from '../../components/Icon/Icon';

const StyledLogout = styled.div`
  padding: 20px;
  background: var(--cb-blue);
  text-align: center;
  border-radius: 3px;
  color: #fff;

  img {
    width: 100px;
    height: auto;
  }

  h1 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
    line-height: 22px;
    color: ${lighten(0.25, '#4285F4')};
  }

  ul {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 10px 0 0;
  }

  ul li {
    float: left;
    font-size: 28px;
    line-height: 28px;

    a {
      color: #fff;
    }

    &:not(:last-child) {
      margin-right: 15px;
    }
  }

  @media screen and (min-width: 768px) {
    padding: 30px;

    h1 {
      font-size: 26px;
    }
  }

  @media screen and (min-width: 992px) {
    padding: 40px;

    h1 {
      font-size: 28px;
    }
  
    p {
      font-size: 18px;
      line-height: 24px;
    }
  }
`;

const { productName, twitterUsername, facebookUsername } = Meteor.settings.public;

class Logout extends React.Component {
  componentDidMount() {
    Meteor.logout(() => this.props.setAfterLoginPath(null));
  }

  render() {
    return (
      <StyledLogout>
        <img
          src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
          alt="Clever Beagle"
        />
        <h1>Stay safe out there.</h1>
        <p>{`Don't forget to like and follow ${productName} elsewhere on the web:`}</p>
        <ul className="FollowUsElsewhere">
          <li><a href={`https://facebook.com/${facebookUsername}?utm_source=app&utm_medium=referral&utm_campaign=logoutPage`}><Icon icon="facebook" /></a></li>
          <li><a href={`https://twitter.com/${twitterUsername}?utm_source=app&utm_medium=referral&utm_campaign=logoutPage`}><Icon icon="twitter" /></a></li>
        </ul>
      </StyledLogout>
    );
  }
}

Logout.propTypes = {
  setAfterLoginPath: PropTypes.func.isRequired,
};

export default Logout;
