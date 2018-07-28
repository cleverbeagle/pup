import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const AccountPageFooter = ({ children }) => (
  <Styles.AccountPageFooter>
    {children}
  </Styles.AccountPageFooter>
);

AccountPageFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AccountPageFooter;
