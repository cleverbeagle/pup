import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
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

const ViewDocument = ({ doc, match, history }) => (
  <Query
    query={gql`
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
    {({ loading, data }) => {
      return (
        <div className="ViewDocument">
          <SEO
            title={data && data.document && data.document.title}
            description={data && data.document && data.document.body}
            url={`documents/${data && data.document && data.document._id}`}
            contentType="article"
            published={data && data.document && data.document.createdAt}
            updated={data && data.document && data.document.updatedAt}
            twitter="clvrbgl"
          />
          <div className="page-header clearfix">
            <h4 className="pull-left">{data && data.document && data.document.title}</h4>
            {Meteor.isClient &&
              Meteor.userId() && (
                <ButtonToolbar className="pull-right">
                  <ButtonGroup bsSize="small">
                    <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
                    <Button onClick={() => handleRemove(data && data.document && data.document._id, history)} className="text-danger">
                      Delete
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              )}
          </div>
          {data && data.document && data.document.body}
        </div>
      );
    }}
  </Query>
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
