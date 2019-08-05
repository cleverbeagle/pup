import React from 'react';
import PropTypes from 'prop-types';

import StyledAccountPageFooter from './styles';

const AccountPageFooter = ({ children }) => (
  <StyledAccountPageFooter>{children}</StyledAccountPageFooter>
);

AccountPageFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AccountPageFooter;
