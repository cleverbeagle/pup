import React from 'react';
import PropTypes from 'prop-types';

const getIconStyle = (iconStyle) =>
  ({
    regular: 'far',
    solid: 'fas',
    light: 'fal',
    brand: 'fab',
  }[iconStyle]);

const Icon = ({ icon, iconStyle }) => <i className={`${getIconStyle(iconStyle)} fa-${icon}`} />;

Icon.defaultProps = {
  iconStyle: 'regular',
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  iconStyle: PropTypes.string,
};

export default Icon;
