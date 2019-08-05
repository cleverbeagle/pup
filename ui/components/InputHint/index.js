import React from 'react';
import PropTypes from 'prop-types';

import StyledInputHint from './styles';

const InputHint = ({ children }) => <StyledInputHint>{children}</StyledInputHint>;

InputHint.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputHint;
