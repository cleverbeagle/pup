import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputHint = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const StyledInputHint = styled(InputHint)`
  display: block;
  margin-top: 8px;
  font-style: italic;
  color: ${props => props.theme.colors.grayLight};
  font-size: 13px;
`;

InputHint.propTypes = {
  className: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default StyledInputHint;
