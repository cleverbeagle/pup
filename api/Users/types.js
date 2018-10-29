export default `
  type User {
    _id: String
    name: String
    emailAddress: String
    oAuthProvider: String
  }

  type Users {
    total: Int
    users: [User]
  }
`;
