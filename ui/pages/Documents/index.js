import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { timeago } from '../../../modules/dates';
import FetchData from '../../components/FetchData';
import BlankState from '../../components/BlankState';
import { StyledDocuments, DocumentsList, Document } from './styles';
import { documents } from '../../queries/Documents.gql';
import { addDocument } from '../../mutations/Documents.gql';

const Documents = ({ match, history }) => (
  <Mutation
    mutation={addDocument}
    onCompleted={(mutation) => {
      history.push(`/documents/${mutation.addDocument._id}/edit`);
    }}
    update={(cache, { data }) => {
      const query = cache.readQuery({ query: documents });
      cache.writeQuery({
        query: documents,
        data: {
          documents: query.documents.concat([data.addDocument]),
        },
      });
    }}
  >
    {(mutate) => (
      <FetchData query={documents}>
        {(data) => (
          <StyledDocuments>
            <header className="clearfix">
              <Button bsStyle="success" onClick={mutate}>
                New Document
              </Button>
            </header>
            {data.documents.length ? (
              <DocumentsList>
                {data.documents.map(({ _id, title, updatedAt }) => (
                  <Document key={_id}>
                    <Link to={`/documents/${_id}/edit`} />
                    <header>
                      <span className="label label-success">Public</span>
                      <h2>{title}</h2>
                      <p>{timeago(updatedAt)}</p>
                    </header>
                  </Document>
                ))}
              </DocumentsList>
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
          </StyledDocuments>
        )}
      </FetchData>
    )}
  </Mutation>
);

Documents.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Documents;
