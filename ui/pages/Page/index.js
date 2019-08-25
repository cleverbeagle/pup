import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Meteor } from 'meteor/meteor';
import Styles from './styles';

const Page = ({ title, subtitle, content }) => {
  if (Meteor.isClient) window.scrollTo(0, 0); // Force window to top of page.
  return (
    <Styles.Page>
      <Styles.Header>
        <Styles.HeaderContainer>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </Styles.HeaderContainer>
      </Styles.Header>
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
