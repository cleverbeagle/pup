import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledAccountPageFooter = styled.div`
  margin: 25px 0 0;
  padding-top: 20px;
  border-top: 1px solid var(--gray-lighter);
`;

const AccountPageFooter = ({ children }) => (
  <StyledAccountPageFooter>
    {children}
  </StyledAccountPageFooter>
);

AccountPageFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AccountPageFooter;
