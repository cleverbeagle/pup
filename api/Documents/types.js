export default `
  type Document {
    _id: String
    title: String
    createdAt: String
    updatedAt: String
    body: String
    owner: String
    comments: [Comment]
  }
`;
