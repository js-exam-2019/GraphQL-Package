const { gql } = require('apollo-server');

module.exports = gql`
  
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    created: String
	  lastUpdated: String
  }

  input AddUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
    userByID(_id: ID!): User
    userByEmail(email: String!): User
  }

  type Mutation {
    userAdd(input: AddUserInput): User
    userUpdate(email: String!, firstName: String!, lastName: String!): User
    userDelete(_id: ID!): User
  }
`;
