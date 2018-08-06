/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';

const Content = ({ content }) => <Styles.Content dangerouslySetInnerHTML={{ __html: content }} />;

Content.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Content;
