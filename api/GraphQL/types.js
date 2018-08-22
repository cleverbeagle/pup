import gql from 'graphql-tag';

export default gql`
  type Document {
    _id: String
    title: String
    body: String
    owner: String
  }

  type Query {
    documents(owner: String): [Document]
  }
`;
