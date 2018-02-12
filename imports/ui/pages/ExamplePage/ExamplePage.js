import React from 'react';
import Page from '../Page/Page';

const content = `
### This is my Markdown page

I can type **any** Markdown I want into this file and it will ultimately be _parsed_ as HTML by Pup's _utility.getPage_ Method.

To learn more, you can [read about this Method here](http://cleverbeagle.com/pup/v1/the-basics/methods#utility-methods).
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
