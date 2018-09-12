import React from 'react';
import PropTypes from 'prop-types';
import DocumentEditor from '../../components/DocumentEditor';

const NewDocument = ({ history }) => (
  <div className="NewDocument">
    <DocumentEditor history={history} />
  </div>
);

NewDocument.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewDocument;
