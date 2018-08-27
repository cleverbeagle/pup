import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import SEO from '../../components/SEO';
import FetchData from '../../components/FetchData';
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

const ViewDocument = ({ match, history }) => (
  <FetchData
    query={`
      {
        document(_id: "${match.params._id}") {
          _id
          title
          body
          createdAt
          updatedAt
        }
      }
    `}
  >
    {({ document }) => (
      <div className="ViewDocument">
        <SEO
          title={document && document.title}
          description={document && document.body}
          url={`documents/${document && document._id}`}
          contentType="article"
          published={document && document.createdAt}
          updated={document && document.updatedAt}
          twitter="clvrbgl"
        />
        <div className="page-header clearfix">
          <h4 className="pull-left">{document && document.title}</h4>
          {Meteor.isClient &&
            Meteor.userId() && (
              <ButtonToolbar className="pull-right">
                <ButtonGroup bsSize="small">
                  <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
                  <Button onClick={() => handleRemove(document && document._id, history)} className="text-danger">
                    Delete
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            )}
        </div>
        {document && document.body}
      </div>
    )}
  </FetchData>
);

ViewDocument.defaultProps = {
  doc: null,
};

ViewDocument.propTypes = {
  doc: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ViewDocument;
