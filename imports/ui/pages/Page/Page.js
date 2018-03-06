import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Content from '../../components/Content/Content';
import PageHeader from '../../components/PageHeader/PageHeader';
import media from '../../stylesheets/style-utils';

const Page = ({
  className, title, subtitle, content,
}) => {
  window.scrollTo(0, 0); // Force window to top of page.
  return (
    <div className={className}>
      <PageHeader title={title} subtitle={subtitle} />
      <Content content={content} />
    </div>
  );
};

const StyledPage = styled(Page)`
  margin-bottom: 30px;

  ${media.tablet`
     margin-bottom: 0px;
  `};
`;

Page.defaultProps = {
  subtitle: '',
};

Page.propTypes = {
  className: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  content: PropTypes.string.isRequired,
};

export default StyledPage;
