const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type Exercise {
    bodyPart: String
    exerciseId: String!
    gifUrl: String
    equipment: String
    name: String!
    target: String
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedExercises: [Exercise]
  }

  input BookInput {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
