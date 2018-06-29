import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import Icon from '../Icon/Icon';

const StyledBlankState = styled.div`
  padding: 40px 0;
  text-align: center;

  img {
    max-width: 300px;
    margin-bottom: 20px;
  }

  i {
    font-size: 100px;
    color: var(--gray-lighter);
    margin-bottom: 20px;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #666;
    margin-bottom: 0;
  }

  p {
    font-size: 15px;
    font-weight: normal;
    color: #aaa;
    margin-top: 10px !important;
    margin-bottom: 0;
  }

  .btn {
    margin-top: 20px;
    margin-bottom: 0 !important;
  }
`;

const BlankState = ({
  image, icon, title, subtitle, action,
}) => (
  <StyledBlankState>
    {image ? <img src={image} alt={title} /> : ''}
    {icon ? <Icon iconStyle={icon.style} icon={icon.symbol} /> : ''}
    <h4>{title}</h4>
    <p>{subtitle}</p>
    {action ? <Button bsStyle={action.style || 'success'} onClick={action.onClick}>{action.label}</Button> : ''}
  </StyledBlankState>
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
