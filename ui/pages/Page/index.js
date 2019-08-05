import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Meteor } from 'meteor/meteor';
import PageHeader from '../../components/PageHeader';

import { StyledPage, Content } from './styles';

const Page = ({ title, subtitle, content }) => {
  if (Meteor.isClient) window.scrollTo(0, 0); // Force window to top of page.
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
