import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getIconStyle = (iconStyle) =>
  ({
    regular: 'far',
    solid: 'fas',
    light: 'fal',
    brand: 'fab',
  }[iconStyle]);

const Icon = ({ icon, iconStyle }) => <FontAwesomeIcon icon={[getIconStyle(iconStyle), icon]} />;

Icon.defaultProps = {
  iconStyle: 'regular',
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  iconStyle: PropTypes.string,
};

export default Icon;
