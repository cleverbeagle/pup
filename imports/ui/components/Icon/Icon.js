import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon }) => (<i className={`fab fa-${icon}`} />);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
