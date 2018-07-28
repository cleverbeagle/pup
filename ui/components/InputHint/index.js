import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInputHint = styled.div`
  display: block;
  margin-top: 8px;
  font-style: italic;
  color: var(--gray-light);
  font-size: 13px;
`;

const InputHint = ({ children }) => (
  <StyledInputHint>
    {children}
  </StyledInputHint>
);

InputHint.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputHint;
