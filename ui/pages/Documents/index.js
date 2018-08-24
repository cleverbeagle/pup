import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import FetchData from '../../components/FetchData';
import BlankState from '../../components/BlankState';
import Styles from './styles';

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

const Documents = ({ match, history }) => (
  <FetchData
    query={`
      {
        documents(owner: "${Meteor.userId()}") {
          _id
          title
          updatedAt
          createdAt
        }
      }
    `}
  >
    {({ loading, data }) => (
      !loading && <Styles.Documents>
        <div className="page-header clearfix">
          <h4 className="pull-left">Documents</h4>
          <Link className="btn btn-success pull-right" to={`${match.url}/new`}>
            Add Document
          </Link>
        </div>
        {data.documents.length ? (
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
              {data.documents.map(({ _id, title, createdAt, updatedAt }) => (
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
                    <Button bsStyle="danger" onClick={() => handleRemove(_id)} block>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <BlankState
            icon={{ style: 'solid', symbol: 'file-alt' }}
            title="You're plum out of documents, friend!"
            subtitle="Add your first document by clicking the button below."
            action={{
              style: 'success',
              onClick: () => history.push(`${match.url}/new`),
              label: 'Create Your First Document',
            }}
          />
        )}
      </Styles.Documents>
    )}
  </FetchData>
);

Documents.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Documents;
