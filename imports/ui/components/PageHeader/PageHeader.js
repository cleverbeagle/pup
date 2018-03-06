import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import media from '../../stylesheets/style-utils';

const PageHeader = ({ className, title, subtitle }) => (
  <div className={className}>
    <div className="PageHeader-container">
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : ''}
    </div>
  </div>
);

const StyledPageHeader = styled(PageHeader)`
  border-bottom: 1px solid ${props => props.theme.colors.grayLighter};
  padding: 20px 0 40px;
  margin-bottom: 40px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 0;
    color: $gray-light;
  }

  .PageHeader-container {
    text-align: center;
  }

  ${media.tablet`
    padding: 10px 0 30px;
    margin-bottom: 30px;
  `};

  ${media.handheldLarge`
    padding: 0px 0 20px;
    margin-bottom: 20px;

    h1 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
    }
  `};
`;

PageHeader.defaultProps = {
  subtitle: '',
};

PageHeader.propTypes = {
  className: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default StyledPageHeader;
