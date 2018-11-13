import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import contractsQuery from '../../queries/Contracts.gql';

const Contracts = ({ data }) => {
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
};

Contracts.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(contractsQuery)(Contracts);
