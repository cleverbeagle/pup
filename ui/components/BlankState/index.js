import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Icon from '../Icon';
import Styles from './styles';

const BlankState = ({
  image, icon, title, subtitle, action,
}) => (
  <Styles.BlankState>
    {image && <img src={image} alt={title} />}
    {icon && <Icon iconStyle={icon.style} icon={icon.symbol} />}
    <h4>{title}</h4>
    <p>{subtitle}</p>
    {action && <Button bsStyle={action.style || 'success'} onClick={action.onClick}>{action.label}</Button>}
  </Styles.BlankState>
);

BlankState.defaultProps = {
  image: null,
  icon: null,
  action: null,
};

BlankState.propTypes = {
  image: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  action: PropTypes.object,
};

export default BlankState;
