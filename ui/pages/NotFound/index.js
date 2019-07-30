import React from 'react';
import { Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const NotFound = () => (
  <div className="NotFound">
    <Alert bsStyle="danger">
      <p>
        <strong>Error [404]</strong>
        {': '}
        {Meteor.isClient ? window.location.pathname : ''}
        {' does not exist.'}
      </p>
    </Alert>
  </div>
);

export default NotFound;
