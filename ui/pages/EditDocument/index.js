import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Documents from '../../../api/Documents/Documents';
import FetchData from '../../components/FetchData';
import DocumentEditor from '../../components/DocumentEditor';
import NotFound from '../NotFound';
import { document } from '../../queries/Documents.gql';

const EditDocument = ({ match, history }) => (
  <FetchData query={document} variables={{ _id: match.params._id }}>
    {({ data }) =>
      data.document ? (
        <React.Fragment>
          <DocumentEditor doc={data.document} history={history} />
        </React.Fragment>
      ) : (
        <NotFound />
      )
    }
  </FetchData>
);

EditDocument.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default EditDocument;
