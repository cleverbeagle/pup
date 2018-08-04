import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Meteor } from 'meteor/meteor';
import PageHeader from '../../components/PageHeader';
import Styles from './styles';

const Page = ({ title, subtitle, content }) => {
  if (Meteor.isClient) window.scrollTo(0, 0); // Force window to top of page.
  return (
    <Styles.Page>
      <PageHeader title={title} subtitle={subtitle} />
      <Styles.Content>
        <ReactMarkdown source={content} />
      </Styles.Content>
    </Styles.Page>
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
