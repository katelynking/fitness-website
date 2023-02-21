import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
// import { getMe, deleteExercise } from '../utils/API';
import Auth from "../utils/auth";
// import { removeExerciseId } from '../utils/localStorage';
// import { SearchExercises } from './SearchExercises';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_EXERCISE } from "../utils/mutations";
import { removeExerciseId } from "../utils/localStorage";

const SavedExercises = () => {
  const { loading, data } = useQuery(GET_ME);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [removeExercise, { error }] = useMutation(REMOVE_EXERCISE);

  //   {
  //   update(cache, { data:  { removeExercise } }) {
  //     try {
  //       cache.writeQuery({
  //         query: GET_ME,
  //         data: { me: removeExercise },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  // }

  const profile = data?.me || data?.profile || {};

  if (loading) {
    return (
      <span className="container-background centered">
        <span className="white-font centered">Loading...</span>
      </span>
    );
  }

  if (!profile?.username) {
    return (
      <span className="container-background centered">
        <h4 className="white-font centered">
          You need to be logged in to see your profile page. Use the navigation
          links above to sign up or log in!
        </h4>
      </span>
    );
  }

  const handleRemoveExercise = async (exerciseId) => {
    console.log(exerciseId);
    try {
      const { info } = await removeExercise({
        variables: { exerciseId: exerciseId },
      });

      removeExerciseId(exerciseId);
      console.log(info);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile.savedExercises.length) {
    return (
      <span className="container-background centered">
        <h4 className="white-font centered">No Exercises Saved Yet</h4>
      </span>
    );
  }
  // console.log(profile);
  // if data isn't here yet, say so
  // if (!userDataLength) {
  //   return <h2>LOADING...</h2>;
  // }

  

  return (
    <>
      <div className="container-background centered">
        <Container fluid>
          <span className="exercise-search-font">YOUR SAVED EXERCISES</span>
        </Container>

        <span className="white-font">
          {profile.savedExercises.length
            ? `Viewing ${profile.savedExercises.length} saved ${
                profile.savedExercises.length === 1 ? "exercise" : "exercises"
              }:`
            : "You have no saved exercises!"}
        </span>
        <br />
        <br />
        <CardColumns>
          {profile.savedExercises.map((exercise) => {
            return (
              <Card key={exercise.exerciseId} className="saved-card">
                <Card.Body>
                  <Card.Title>{exercise.name}</Card.Title>
                  <p className="small">Body Part: {exercise.bodyPart}</p>
                  <Card.Text>{exercise.target}</Card.Text>
                  <p>Equipment: {exercise.equipment}</p>
                  <Card.Img
                    src={exercise.gifUrl}
                    alt={`The cover for ${exercise.name}`}
                    variant="top"
                  />
                  <Button
                    className="btn-block btn-danger remove-btn"
                    // onClick={() => handleRemoveExercise(exercise.exerciseId)}
                    onClick={handleShow}
                  >
                    REMOVE
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>You want to quit?!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Sorry, quiting isn't allowed at TRAKLETE. Put down the remote and keep working out. You got this!
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button> */}
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </div>
    </>
  );
};

export default SavedExercises;
