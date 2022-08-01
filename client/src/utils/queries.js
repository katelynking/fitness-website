import { gql } from '@apollo/client';

// export const GET_ME = gql`
//   {
//     me {
//       _id
//       username
//       email
//       exerciseCount
      // savedExercises {
      //   exerciseId
      //   name
      //   bodyPart
      //   target
      //   equipment
      //   gifUrl
      // }
//     }
//   }
// `;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      exerciseCount
      savedExercises {
        exerciseId
        name
        bodyPart
        target
        equipment
        gifUrl
      }
    }
  }
`;
