import React from 'react';
import { Meteor } from 'meteor/meteor';
import Page from '../Page';
import content from './content';

const Terms = () => (
  <div className="Terms">
    <Page
      title="Terms of Service"
      subtitle="Last updated May 29th, 2017"
      content={content}
    />
  </div>
);

export default Terms;
