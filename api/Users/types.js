export default `
  type Name {
    first: String
    last: String
  }

  input NameInput {
    first: String
    last: String
  }

  type Role {
    _id: String
    name: String
    inRole: Boolean
  }

  input ProfileInput {
    name: NameInput
  }
  
  input UserInput {
    _id: String,
    email: String,
    password: String,
    profile: ProfileInput,
    roles: [String],
  }

  type User {
    _id: String
    name: Name
    username: String
    emailAddress: String
    oAuthProvider: String
    roles: [Role]
  }

  type Users {
    total: Int
    users: [User]
  }
`;
