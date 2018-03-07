import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { lighten, darken } from 'polished';
import media from '../../stylesheets/style-utils';

const Index = ({ className }) => (
  <div className={className}>
    <img
      src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
      alt="Clever Beagle"
    />
    <h1>Pup</h1>
    <p>A boilerplate for products.</p>
    <div>
      <Button href="http://cleverbeagle.com/pup">Read the Docs</Button>
      <Button href="https://github.com/cleverbeagle/pup"><i className="fa fa-star" /> Star on GitHub</Button>
    </div>
    <footer>
      <p>Need help and want to stay accountable building your product? <a href="https://cleverbeagle.com?utm_source=pupappindex&utm_medium=app&utm_campaign=oss">Check out Clever Beagle</a>.</p>
    </footer>
  </div>
);

const StyledIndex = styled(Index)`
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
    color: ${props => lighten(0.25, props.theme.colors.cbBlue)};
  }

  > div {
    display: inline-block;
    margin: 10px 0 0;

    .btn:first-child {
      margin-right: 10px;
    }

    .btn {
      border: none;
    }
  }

  footer {
    margin: 40px -40px -40px;
    border-top: 1px solid ${props => darken(0.10, props.theme.colors.cbBlue)};
    padding: 20px;

    p {
      font-size: 14px;
      line-height: 22px;
      color: ${props => lighten(0.35, props.theme.colors.cbBlue)};
      margin: 0;
    }

    p a {
      color: ${props => lighten(0.35, props.theme.colors.cbBlue)};
      text-decoration: underline;
    }
  }

  ${media.tablet`
    padding: 30px;

    footer {
      margin: 30px -30px -30px;
    }
  `};


  ${media.handheldLarge`
    padding: 20px;

    footer {
      margin: 20px -20px -20px;
    }
  `};
`;

Index.propTypes = {
  className: PropTypes.node.isRequired,
};

export default StyledIndex;
