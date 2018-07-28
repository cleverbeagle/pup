import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import DocumentsCollection from '../../../api/Documents';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading';
import BlankState from '../../components/BlankState';

const StyledDocuments = styled.div`
  table tbody tr td {
    vertical-align: middle;
  }
`;

const handleRemove = (documentId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('documents.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
      }
    });
  }
};

const Documents = ({
  loading, documents, match, history,
}) => (!loading ? (
  <StyledDocuments>
    <div className="page-header clearfix">
      <h4 className="pull-left">Documents</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Document</Link>
    </div>
    {documents.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {documents.map(({
            _id, title, createdAt, updatedAt,
          }) => (
            <tr key={_id}>
              <td>{title}</td>
              <td>{timeago(updatedAt)}</td>
              <td>{monthDayYearAtTime(createdAt)}</td>
              <td>
                <Button
                  bsStyle="primary"
                  onClick={() => history.push(`${match.url}/${_id}`)}
                  block
                >
                  View
                </Button>
              </td>
              <td>
                <Button
                  bsStyle="danger"
                  onClick={() => handleRemove(_id)}
                  block
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> : <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="You're plum out of documents, friend!"
        subtitle="Add your first document by clicking the button below."
        action={{
          style: 'success',
          onClick: () => history.push(`${match.url}/new`),
          label: 'Create Your First Document',
        }}
      />}
  </StyledDocuments>
) : <Loading />);

Documents.propTypes = {
  loading: PropTypes.bool.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('documents');
  return {
    loading: !subscription.ready(),
    documents: DocumentsCollection.find().fetch(),
  };
})(Documents);
