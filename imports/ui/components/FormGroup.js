import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CustomFormGroup = ({ className, children }) => (
  <div className={`form-group ${className}`}>{children}</div>
);

const StyledFormGroup = styled(CustomFormGroup)`
label,
.control-label {
    display: block;
}

label.error {
    display: block;
    margin-top: 8px;
    font-size: 13px;
    font-weight: normal;
    color: ${props => props.theme.colors.danger};
}
`;

CustomFormGroup.propTypes = {
  className: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default StyledFormGroup;

