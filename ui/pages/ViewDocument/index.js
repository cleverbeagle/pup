import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Documents from '../../../api/Documents/Documents';
import SEO from '../../components/SEO';
import NotFound from '../NotFound';

const handleRemove = (documentId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('documents.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
        history.push('/documents');
      }
    });
  }
};

const renderDocument = (doc, match, history) =>
  doc ? (
    <div className="ViewDocument">
      <SEO
        title={doc.title}
        description={doc.body}
        url={`documents/${doc._id}`}
        contentType="article"
        published={doc.createdAt}
        updated={doc.updatedAt}
        twitter="clvrbgl"
      />
      <div className="page-header clearfix">
        <h4 className="pull-left">{doc && doc.title}</h4>
        {Meteor.isClient &&
          Meteor.userId() && (
            <ButtonToolbar className="pull-right">
              <ButtonGroup bsSize="small">
                <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
                <Button onClick={() => handleRemove(doc._id, history)} className="text-danger">
                  Delete
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          )}
      </div>
      {doc && doc.body}
    </div>
  ) : (
    <NotFound />
  );

const ViewDocument = ({ doc, match, history }) => renderDocument(doc, match, history);

ViewDocument.defaultProps = {
  doc: null,
};

ViewDocument.propTypes = {
  doc: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  connect((state) => ({ ...state })),
  withTracker(({ match }) => {
    const documentId = match.params._id;
    if (Meteor.isClient) Meteor.subscribe('documents.view', documentId);

    return {
      doc: Documents.findOne(documentId),
    };
  }),
)(ViewDocument);
