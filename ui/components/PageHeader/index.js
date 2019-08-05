import React from 'react';
import PropTypes from 'prop-types';

import { StyledPageHeader, PageHeaderContainer } from './styles';

const PageHeader = ({ title, subtitle }) => (
  <StyledPageHeader>
    <PageHeaderContainer>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </PageHeaderContainer>
  </StyledPageHeader>
);

PageHeader.defaultProps = {
  subtitle: '',
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageHeader;
