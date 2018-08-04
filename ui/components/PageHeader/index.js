import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';

const PageHeader = ({ title, subtitle }) => (
  <Styles.PageHeader>
    <Styles.PageHeaderContainer>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </Styles.PageHeaderContainer>
  </Styles.PageHeader>
);

PageHeader.defaultProps = {
  subtitle: '',
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageHeader;
