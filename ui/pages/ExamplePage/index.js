import React from 'react';
import Page from '../Page';
import content from './content';

const ExamplePage = () => (
  <div className="ExamplePage">
    <Page
      title="My Example Page"
      subtitle="A subtitle for my example page."
      content={content}
    />
  </div>
);

export default ExamplePage;
