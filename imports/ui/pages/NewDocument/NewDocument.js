import React from 'react';
import PropTypes from 'prop-types';
import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';

const NewDocument = ({ history }) => (
  <div className="NewDocument">
    <h4 className="page-header">New Document</h4>
    <DocumentEditor history={history} />
  </div>
);

NewDocument.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewDocument;
