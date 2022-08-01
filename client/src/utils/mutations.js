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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        exerciseCount
        calorieCount
      }
    }
  }
`;

export const SAVE_EXERCISE = gql`
  mutation SaveExercise($exerciseData: ExerciseInput!) {
    saveExercise(exerciseData: $exerciseData) {
      _id
      username
      email
      savedExercises {
        exerciseId
        name
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

export const SAVE_CALORTIES = gql`
mutation saveCalories(ScalorieData: CaloriesInput!) {
  saveCalories(calorieData: $calorieData) {
    _id
    username
    email
    savedCalories {
      calorieId
      name
    }
  }
}
`;

export const REMOVE_CALORIES = gql`
  mutation removeCalories($calorieId: ID!) {
    removeCalories(calorieId: $calorieId) {
      email
      savedCalories {
        calories
        calorieId
        totalCal
        name
        duration
      }
    }
  }
`;
