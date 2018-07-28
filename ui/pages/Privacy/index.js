import React from 'react';
import Page from '../Page';
import content from './content';

const Privacy = () => (
  <div className="Privacy">
    <Page
      title="Privacy Policy"
      subtitle="Last updated May 29th, 2017"
      content={content}
    />
  </div>
);

export default Privacy;
