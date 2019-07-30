export default `
  type Document {
    _id: String
    isPublic: Boolean
    title: String
    createdAt: String
    updatedAt: String
    body: String
    owner: String
    comments(sortBy: String): [Comment]
  }
`;
