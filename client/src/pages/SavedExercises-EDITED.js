// import React, { useState, useEffect } from "react";
import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
// import DropdownItem from "react-bootstrap/esm/DropdownItem";
// import { getMe, deleteExercise } from "../utils/API";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from "../utils/queries";
import { REMOVE_EXERCISE } from "../utils/mutations";
import { removeExerciseId } from "../utils/localStorage";

import Auth from "../utils/auth";


const SavedExercises = () => {
  console.log('SavedExercises');
  // const [caloriesList] = useState(["Running", "Skiing", "Football", "Lifting"]);
  // const [userData, setUserData] = useState({});
  // const [searchedCals, setSearchedCals] = useState([]);
  // const [calories, setCalories] = useState("");

  const { loading , data } = useQuery(GET_ME);
  const [removeExercise, { error }] = useMutation(REMOVE_EXERCISE);
  
  const userData = data?.me || {};
  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error("something went wrong!");
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);

  // const handleFormSubmit = async (calories) => {
  //   console.log(calories);

  //   try {
  //     const url = `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${calories.toLowerCase()}`;

  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "6ac7ece7aamsh9369ca45e027031p1ab0fbjsn1c8c1f20dd0d",
  //         "X-RapidAPI-Host": "calories-burned-by-api-ninjas.p.rapidapi.com",
  //       },
  //     };

  //     const res = await fetch(url, options);
  //     const response = await res.json();
  //     console.log(response);

  //     const caloriesData = response.map((cal) => ({
  //       name: cal.name,
  //       burned: cal.calories_per_hour,
  //       duration: cal.duration_minutes,
  //       totalCal: cal.total_calories,
  //     }));
  //     setSearchedCals(caloriesData);
  //     setCalories("");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // create function that accepts the exercise's mongo _id value as param and deletes the exercise from the database
  const handleDeleteExercise = async (exerciseId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await deleteExercise(exerciseId, token);

      // if (!response.ok) {
      //   throw new Error("something went wrong!");
      // }

      const { data } = await removeExercise({
        variables: { exerciseId },
      });

      // const updatedUser = await response.json();
      // setUserData(updatedUser);
      // upon success, remove exercise's id from localStorage
      removeExerciseId(exerciseId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
  // if (!userDataLength) {
    return 
    <h2 className='loading'>LOADING...</h2>;
  }

  // const handleCalorieSelection = async (calories) => {
  //   console.log(calories);

  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   handleFormSubmit(calories);
  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     // const response = await saveBook(bookToSave, token);

  //     // if (!response.ok) {
  //     //   throw new Error('something went wrong!');
  //     // }

  //     // if exercise successfully saves to user's account, save exercise id to state
  //     setCalories("lifting");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <>
      <div className='container-background centered'>
        <Container fluid>
          <h1>Viewing {userData.username}'s exercises!</h1>
          {/* <DropdownButton id="dropdown-basic-button" title="Pick Body Part">
            {caloriesList.map((calories) => {
              return (
                <Dropdown.Item
                  key={calories}
                  data-calories={calories}
                  target={calories}
                  onClick={(e) => {
                    handleCalorieSelection(
                      e.target.getAttribute("data-calories")
                    );
                  }}
                >
                  {calories}
                </Dropdown.Item>
              );
            })}
          </DropdownButton> */}
        </Container>
   
      <Container>
        <h2>
          {userData.savedExercises.length
            ? `Viewing ${userData.savedExercises.length} saved ${
                userData.savedExercises.length === 1 ? "exercise" : "exercises"
              }:`
            : "You have no saved exercises!"}
        </h2>
        <CardColumns>
          {/* {searchedCals.map((cal) => {
            return (
              <Card key={cal.name} border="dark"> */}
                {/* {exercise.image ? (
                  <Card.Img
                    src={exercise.image}
                    alt={`The cover for ${cal.name}`}
                    variant="top"
                  />
                ) : null} */}
                {/* <Card.Body>
                  <Card.Title>{cal.name}</Card.Title>
                  <p className="small">
                    Calories burned: {cal.calories_per_hour}
                  </p>
                  <p className="small">Duration: {cal.duration_minutes}</p>
                  <p className="small">Total Calories: {cal.totat_calories}</p>
                  <Card.Text>Equipment: {cal.equipment}</Card.Text>
                </Card.Body>
              </Card>
            );
          })} */}
          {userData.savedExercises.map((exercise) => {
            return (
              <Card key={exercise.exerciseId} border="dark">
                {exercise.image ? (
                  <Card.Img
                    src={exercise.image}
                    alt={`The cover for ${exercise.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title className="card-title">{exercise.name}</Card.Title>
                  <p className="small">Exercise: {exercise.name}</p>
                  <p className="small">Body Part: {exercise.bodyPart}</p>
                  <p className="small">Target: {exercise.target}</p>
                  <Card.Text>Equipment: {exercise.euipment}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteExercise(exercise.exerciseId)}
                  >
                    Delete this exercise!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      </div>
    </>
  );
};

export default SavedExercises;
