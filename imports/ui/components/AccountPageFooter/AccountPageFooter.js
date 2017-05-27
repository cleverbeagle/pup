import React from 'react';
import PropTypes from 'prop-types';

import './AccountPageFooter.scss';

const AccountPageFooter = ({ children }) => (
  <div className="AccountPageFooter">
    {children}
  </div>
);

AccountPageFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AccountPageFooter;
