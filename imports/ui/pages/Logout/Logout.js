import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import { lighten } from 'polished';
import media from '../../stylesheets/style-utils';
import Icon from '../../components/Icon/Icon';

class Logout extends React.Component {
  componentDidMount() {
    Meteor.logout(() => this.props.setAfterLoginPath(null));
  }

  render() {
    return (
      <div className={this.props.className}>
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

const StyledLogout = styled(Logout)`
  padding: 40px;
  background: ${props => props.theme.colors.cbBlue};
  text-align: center;
  border-radius: 3px;
  color: #fff;

  img {
    width: 100px;
    height: auto;
  }

  h1 {
    font-size: 28px;
  }

  p {
    font-size: 18px;
    color: ${props => lighten(0.25, props.theme.colors.cbBlue)};;
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

${media.tablet`
  padding: 30px;
`};


${media.handheldLarge`
  padding: 20px;
`};
`;


Logout.propTypes = {
  className: PropTypes.node.isRequired,
  setAfterLoginPath: PropTypes.func.isRequired,
};

export default StyledLogout;
