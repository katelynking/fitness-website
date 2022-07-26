const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    exerciseCount: Int
    savedExercises: [Exercise]
  }

  type Exercise {
    bodyPart: String
    exerciseId: String!
    gifUrl: String
    equipment: String
    name: String!
    target: String
  }

  type Calories {
    calories: String
    calorieId: String
    totalCal: String
    name: String!
    duration: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    exerciseCount: Int 
    savedExercises: [Exercise]
  }

  type Auth {
    token: ID
    user: User
  }

  input ExerciseInput {
    bodyPart: String
    exerciseId: String!
    gifUrl: String
    equipment: String
    name: String!
    target: String
  }

  input CaloriesInput {
    calories: String
    calorieId: String
    totalCal: String
    name: String!
    duration: String
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveExercises(exerciseData: ExerciseInput!): User
    removeExercise(exerciseId: String!): User
    saveCalories(calorieData: CaloriesInput!): User
    removeCalories(calorieId: String!): User
  }
`;

module.exports = typeDefs;
