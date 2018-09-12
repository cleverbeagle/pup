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
import { document } from '../../queries/Documents.gql';

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
  <FetchData query={document} variables={{ _id: match.params._id }}>
    {(data) => (
      <div className="ViewDocument">
        <SEO
          title={data.document && data.document.title}
          description={data.document && data.document.body}
          url={`documents/${data.document && data.document._id}`}
          contentType="article"
          published={data.document && data.document.createdAt}
          updated={data.document && data.document.updatedAt}
          twitter="clvrbgl"
        />
        <div className="page-header clearfix">
          <h4 className="pull-left">{data.document && data.document.title}</h4>
          {Meteor.isClient &&
            Meteor.userId() && (
              <ButtonToolbar className="pull-right">
                <ButtonGroup bsSize="small">
                  <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
                  <Button
                    className="text-danger"
                    onClick={() => {
                      handleRemove(data.document && data.document._id, history);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            )}
        </div>
        {data.document && data.document.body}
      </div>
    )}
  </FetchData>
);

ViewDocument.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ViewDocument;
