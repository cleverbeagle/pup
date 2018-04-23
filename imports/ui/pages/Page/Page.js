import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import PageHeader from '../../components/PageHeader/PageHeader';

const StyledPage = styled.div`
  margin-bottom: 0px;

  @include media screen and (min-width: 768px) {
    margin-bottom: 30px;
  }
`;

const Content = styled.div`
  max-width: 700px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 22px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 30px 0 20px;
  }
    
  p {
    margin-bottom: 20px;
  }
    
  > *:first-child {
    margin-top: 0px;
  }
    
  > *:last-child {
    margin-bottom: 0px;
  }

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const Page = ({ title, subtitle, content }) => {
  window.scrollTo(0, 0); // Force window to top of page.
  return (
    <StyledPage>
      <PageHeader title={title} subtitle={subtitle} />
      <Content>
        <ReactMarkdown source={content} />
      </Content>
    </StyledPage>
  );
};

Page.defaultProps = {
  subtitle: '',
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  content: PropTypes.string.isRequired,
};

export default Page;
