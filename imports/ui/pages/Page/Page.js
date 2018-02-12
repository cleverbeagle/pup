import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import PageHeader from '../../components/PageHeader/PageHeader';

import './Page.scss';

const Page = ({ title, subtitle, content }) => {
  window.scrollTo(0, 0); // Force window to top of page.
  return (
    <div className="Page">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="Content">
        <ReactMarkdown source={content} />
      </div>
    </div>
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
