import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Documents from '../../../api/Documents/Documents';
import FetchData from '../../components/FetchData';
import DocumentEditor from '../../components/DocumentEditor';
import NotFound from '../NotFound';

const EditDocument = ({ match, history }) => (
  <FetchData
    query={`
      {
        document(_id: "${match.params._id}") {
          _id
          title
          body
        }
      }  
    `}
  >
    {({ document }) =>
      document ? (
        <React.Fragment>
          <h4 className="page-header">{`Editing "${document.title}"`}</h4>
          <DocumentEditor doc={document} history={history} />
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
