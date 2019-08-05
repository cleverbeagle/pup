/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';

import StyledContent from './styles';

const Content = ({ content }) => <StyledContent dangerouslySetInnerHTML={{ __html: content }} />;

Content.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Content;
