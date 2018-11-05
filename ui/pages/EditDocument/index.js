import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import DocumentEditor from '../../components/DocumentEditor';
import Loading from '../../components/Loading';
import NotFound from '../NotFound';
import { editDocument as editDocumentQuery } from '../../queries/Documents.gql';

const EditDocument = ({ data, history }) => (
  <React.Fragment>
    {!data.loading ? (
      <React.Fragment>
        {data.document ? <DocumentEditor doc={data.document} history={history} /> : <NotFound />}
      </React.Fragment>
    ) : (
      <Loading />
    )}
  </React.Fragment>
);

EditDocument.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default graphql(editDocumentQuery, {
  options: ({ match }) => ({
    variables: {
      _id: match.params._id,
    },
  }),
})(EditDocument);
