// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Book {
    bookId: String
    title: String
    description: String
    image: String
    link: String
    authors: [String]
  }
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    helloWorld: String
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addSavedBook(
      bookId: String!
      title: String!
      description: String
      image: String
      authors: [String]
    ): User
    removeSavedBook(bookId: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
