import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';

const InputHint = ({ children }) => <Styles.InputHint>{children}</Styles.InputHint>;

InputHint.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputHint;
