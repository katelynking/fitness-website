import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!, 
    $email: String!, 
    $password: String!) 
    {
    addUser(
      username: $username, 
      email: $email, 
      password: $password) 
      {
      token
      user {
        _id
        username
        email
        exerciseCount
      }
    }
  }
`;

export const SAVE_EXERCISE = gql`
mutation saveExercise(
  $exerciseId: String!
  $bodyPart: [String]
  $gifUrl: String
  $equipment: String
  $name: String
  $target: String
) {
  saveExercise(
      exerciseId: $exerciseId
      bodyPart: $bodyPart
      gifUrl: $gifUrl
      equipment: $equipment
      name: $name
      target: $target
  ) {
      email
      savedExercises {
          exerciseId
          bodyPart
          gifUrl
          equipment
          name
          target
      }
  }
}
`;

export const REMOVE_EXERCISE = gql`
  mutation removeExercise($exerciseId: ID!) {
    removeExercise(exerciseId: $exerciseId) {
      email
      savedExercise {
        bodyPart
        exerciseId
        gifUrl
        equipment
        name
        target
      }
    }
  }
`;
