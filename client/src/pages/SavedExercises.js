import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
// import { getMe, deleteExercise } from '../utils/API';
import Auth from '../utils/auth';
import { removeExerciseId } from '../utils/localStorage';
// import { SearchExercises } from './SearchExercises';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_EXERCISE } from '../utils/mutations';

const SavedExercises = () => {
  // const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;

  const { loading, data } = useQuery(GET_ME);

  const [removeExercise, { error }] = useMutation(REMOVE_EXERCISE, {
    update(cache, { data: { removeExercise } }) {
      try {
        cache.writeQuery({
          query: GET_ME,
          data: { me: removeExercise },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const profile = data?.me || data?.profile || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.username) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }



  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);


  // const handleDeleteExercise = async (exerciseId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const response = await REMOVE_EXERCISE(exerciseId, token);

  //     if (!response.ok) {
  //       throw new Error('something went wrong!');
  //     }

  //     const updatedUser = await response.json();
  //     setUserData(updatedUser);

  //     removeExerciseId(exerciseId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };



  const handleRemoveExercise = async (exerciseId) => {
    try {
      const { data } = await removeExercise({
        variables: { exerciseId },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile.savedExercises.length) {
    return <h3>No Exercises Saved Yet</h3>;
  }
  console.log(profile);
  // if data isn't here yet, say so
  // if (!userDataLength) {
  //   return <h2>LOADING...</h2>;
  // }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved exercisess!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {profile.savedExercises.length
            ? `Viewing ${profile.savedExercises.length} saved ${profile.savedExercises.length === 1 ? 'exercise' : 'exercises'}:`
            : 'You have no saved exercises!'}
        </h2>
        <CardColumns>
          {profile.savedExercises.map((exercise) => {
            return (
              <Card key={exercise.exerciseId} border='dark'>

                <Card.Body>
                  <Card.Title>{exercise.name}</Card.Title>
                  <p className='small'>Body Part: {exercise.bodyPart}</p>
                  <Card.Text>{exercise.target}</Card.Text>
                  <p>Equipment: {exercise.equipment}</p>
                  <Card.Img
                    src={exercise.gifUrl}
                    alt={`The cover for ${exercise.name}`}
                    variant="top"
                  />
                  <Button className='btn-block btn-danger' onClick={() => handleRemoveExercise(exercise.exerciseId)}>
                    Delete this Exercise!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedExercises;
