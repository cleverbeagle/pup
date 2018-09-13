import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Alert } from 'react-bootstrap';
import Loading from '../Loading';

const FetchData = ({ query, children, ...rest }) => (
  <Query query={query} {...rest}>
    {(renderProps) => {
      if (renderProps.loading) return <Loading />;
      if (renderProps.error) {
        return (
          <Alert bsStyle="danger">
            GraphQL Query Error: Check your browser console for details (see <code>[GraphQL error]</code> and <code>[Network error]</code>).
          </Alert>
        );
      }
      return renderProps.data && children(renderProps.data);
    }}
  </Query>
);

FetchData.propTypes = {
  query: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
};

export default FetchData;
