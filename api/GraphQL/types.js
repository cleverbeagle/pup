import gql from 'graphql-tag';

export default gql`
  type Document {
    _id: String
    title: String
    createdAt: String
    updatedAt: String
    body: String
    owner: String
    comments: [Comment]
  }

  type Comment {
    _id: String
    userId: String
    documentId: String
    createdAt: String
    text: String
  }

  type Query {
    documents(owner: String): [Document]
    document(_id: String): Document
  }
`;
