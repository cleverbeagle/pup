export default `
  type Document {
    _id: String
    public: Boolean
    title: String
    createdAt: String
    updatedAt: String
    body: String
    owner: String
    comments: [Comment]
  }
`;
