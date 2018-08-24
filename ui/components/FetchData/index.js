import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';

const FetchData = ({ query, children, ...rest }) => (
  <Query query={gql(query)} {...rest}>
    {(renderProps) => {
      // if (renderProps.loading) return <Loading />;
      // if (renderProps.error) return <p>Error :(</p>;
      return renderProps.data && children(renderProps);
    }}
  </Query>
);

FetchData.propTypes = {
  query: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default FetchData;
