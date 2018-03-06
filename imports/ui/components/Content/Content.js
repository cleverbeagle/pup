/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import media from '../../stylesheets/style-utils';

const Content = ({ className, content }) => (
  <div className={className}>
    <ReactMarkdown source={content} />
  </div>
);

const StyledContent = styled(Content)`
  max-width: 700px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 22px;
  overflow: scroll;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 30px 0 20px;
  }

  p {
    margin-bottom: 20px;
  }

  > *:first-child {
    margin-top: 0px;
  }

  > *:last-child {
    margin-bottom: 0px;
  }

  ${media.tablet`
    font-size: 14px;
  `};
`;

Content.propTypes = {
  className: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
};

export default StyledContent;
