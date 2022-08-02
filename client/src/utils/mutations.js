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
        
      }
    }
  }
`;

export const SAVE_EXERCISE = gql`
  mutation saveExercises($exerciseData: ExerciseInput!) {
    saveExercises(exerciseData: $exerciseData) {
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
      _id
      username
      email
      savedExercises {
        exerciseId
      }
    }
  }
`;

// export const SAVE_CALORIES = gql`
// mutation saveCalories($calorieData: CaloriesInput!) {
//   saveCalories(calorieData: $calorieData) {
//     _id
//     username
//     email
//     savedCalories {
//       calorieId
//       name
//     }
//   }
// }
// `;

export const SAVE_CALORIES = gql`
mutation saveCalories($calorieData: CaloriesInput!) {
  saveCalories(calorieData: $calorieData) {
    _id
    username
    email
    exerciseCount
    savedExercises {
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

export const REMOVE_CALORIES = gql`
  mutation removeCalories($calorieId: ID!) {
    removeCalories(calorieId: $calorieId) {
      email
      savedCalories {
        calorieId
      }
    }
  }
`;