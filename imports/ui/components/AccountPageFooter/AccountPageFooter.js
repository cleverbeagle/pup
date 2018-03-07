import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AccountPageFooter = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const StyledAccountPageFooter = styled(AccountPageFooter)`
  margin: 25px 0 0;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.colors.grayLighter};
`;

AccountPageFooter.propTypes = {
  className: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default StyledAccountPageFooter;
