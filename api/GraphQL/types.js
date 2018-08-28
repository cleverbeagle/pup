import gql from 'graphql-tag';

export default gql`
  type Comment {
    _id: String
    document: String
    userId: String
    text: String
    createdAt: String
  }

  type Document {
    _id: String
    title: String
    createdAt: String
    updatedAt: String
    body: String
    owner: String
    comments: [Comment]
  }

  type Query {
    documents(owner: String): [Document]
    document(_id: String): Document
    comments(document: String): [Comment]
  }

  type Mutation {
    addDocument(title: String, body: String): Document
    updateDocument: Document
    removeDocument: Document
  }

  type Subscription {
    documentAdded: Document
    documentUpdated: Document
    documentRemoved: Document
  }
`;
