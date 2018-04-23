import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPageHeader = styled.div`
  border-bottom: 1px solid var(--gray-lighter);
  padding: 0px 0 20px;
  margin-bottom: 20px;

  h1 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 0;
    color: var(--gray-light);
  }

  @media screen and (min-width: 768px) {
    padding: 10px 0 30px;
    margin-bottom: 30px;

    h1 {
      font-size: 24px;
    }

    p {
      font-size: 16px;
    }
  }

  @media screen and (min-width: 992px) {
    padding: 20px 0 40px;
    margin-bottom: 40px;
  }
`;

const StyledPageHeaderContainer = styled.div`
  text-align: center;
`;

const PageHeader = ({ title, subtitle }) => (
  <StyledPageHeader>
    <StyledPageHeaderContainer>
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : ''}
    </StyledPageHeaderContainer>
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
