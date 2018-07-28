/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 22px;

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

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const Content = ({ content }) => (
  <StyledContent dangerouslySetInnerHTML={{ __html: content }} />
);

Content.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Content;
