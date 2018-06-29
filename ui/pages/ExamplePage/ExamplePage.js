import React from 'react';
import Page from '../Page/Page';

const content = `
### This is my Markdown page
I can type **any** Markdown I want into this file and it will ultimately be parsed into HTML by the &lt;Page /&gt; component in the source of this page.
`;

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
