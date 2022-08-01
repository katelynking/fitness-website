import React, { useState, useEffect } from "react";
import {
  // Jumbotron,
  Container,
  // Col,
  // Form,
  Button,
  Card,
  CardColumns,
  // Navbar
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Auth from "../utils/auth";
// import { saveBook, searchGoogleBooks } from '../utils/API';
import { saveExerciseIds, getSavedExerciseIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_EXERCISE } from "../utils/mutations";
// import DropdownItem from "react-bootstrap/esm/DropdownItem";

const SearchExercises = () => {
  const [exerciseList] = useState([
    "Back",
    "Cardio",
    "Chest",
    "Lower Arms",
    "Lower Legs",
    "Neck",
    "Shoulders",
    "Upper Arms",
    "Upper Legs",
    "Waist",
  ]);
  // create state for holding returned google api data
  const [searchedExercises, setSearchedExercises] = useState([]);
  // create state for holding our search field data
  // const [exercise, setExercise] = useState("");

  // create state to hold saved exerciseId values
  const [savedExerciseIds, setSavedExerciseIds] = useState(getSavedExerciseIds());

  const [saveExercise] = useMutation(SAVE_EXERCISE);
  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveExerciseIds(savedExerciseIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (exercise) => {
    // event.preventDefault();
    console.log(exercise);

    // if (!exercise) {
    //   return false;
    // }

    try {
      // const response = await searchGoogleBooks(searchInput);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      const url2 = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${exercise.toLowerCase()}`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "6ac7ece7aamsh9369ca45e027031p1ab0fbjsn1c8c1f20dd0d",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };

      const resEx = await fetch(url2, options);
      const res = await resEx.json();

      console.log(res);
      // }

      const exerciseData = res.map((exercise) => ({
        exerciseId: exercise.id,
        name: exercise.name,
        bodyPart: exercise.bodyPart,
        target: exercise.target,
        equipment: exercise.equipment,
        gifUrl: exercise.gifUrl,

        // const { items } = await response.json();

        // const bookData = items.map((exercise) => ({
        //   exerciseId: exercise.id,
        //   authors: exercise.volumeInfo.authors || ['No author to display'],
        //   title: exercise.volumeInfo.title,
        //   description: exercise.volumeInfo.description,
        //   image: exercise.volumeInfo.imageLinks?.thumbnail || '',
      }));
      // console.log(bookData);
      setSearchedExercises(exerciseData);
      // setExercise("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a exercise to our database
  const handleExerciseSelection = async (exercise) => {
    // find the exercise in `searchedExercises` state by the matching id
    console.log(exercise);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    handleFormSubmit(exercise);
    if (!token) {
      return false;
    }

    // try {
    //   // const response = await saveBook(bookToSave, token);

    //   // if (!response.ok) {
    //   //   throw new Error('something went wrong!');
    //   // }

    //   // if exercise successfully saves to user's account, save exercise id to state
    //   // setExercise("chest");
    // } catch (err) {
    //   console.error(err);
    // }
  
  };

  const handleSaveExercise = async (exerciseId) => {
    // find the book in `searchedBooks` state by the matching id
    const exerciseToSave = searchedExercises.find((exercise) => exercise.exerciseId === exerciseId);
    console.log(exerciseToSave);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await saveExercise(exerciseToSave, token);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      const { data } = await saveExercise({
        variables: { exerciseData: { ...exerciseToSave } }
      });
      console.log(data.saveExercises.savedExercises);

      // if book successfully saves to user's account, save book id to state
      setSavedExerciseIds([...savedExerciseIds, exerciseToSave.exerciseId]);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className='container-background centered'>
      <div>
        <Container fluid >
          <span className='exercise-search-font'>
            SEARCH FOR EXERCISES</span>
          <DropdownButton id="dropdown-basic-button" title="SELECT BODY PART">
            {exerciseList.map((exercise) => {
              return (
                <Dropdown.Item
                  key={exercise}
                  data-exercise={exercise}
                  target={exercise}
                  onClick={(e) => {
                    handleExerciseSelection(
                      e.target.getAttribute("data-exercise")
                    );
                  }}
                >
                  {exercise}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Container>
      </div>

      <Container as='container'>
        <span className='white-font'>
          {searchedExercises.length
            ? `Viewing ${searchedExercises.length} results:`
            : "Search for an exercise to begin"}
        </span>
        <CardColumns>
          {searchedExercises.map((exercise) => {
            return (
              <Card className='card-body' key={exercise.exerciseId}>
                {exercise.gifUrl ? (
                  <Card.Img
                    src={exercise.gifUrl}
                    alt={`The cover for ${exercise.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body >
                  <Card.Title className='card-title'>{exercise.name}</Card.Title>
                  <p className="small">Exercise: {exercise.name}</p>
                  <p className="small">Body Part: {exercise.bodyPart}</p>
                  <p className="small">Target: {exercise.target}</p>
                  <Card.Text>Equipment: {exercise.equipment}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedExerciseIds?.some((savedExerciseId) => savedExerciseId === exercise.exerciseId)}
                      className="btn-block btn-info add-btn"
                      onClick={() => handleSaveExercise(exercise.exerciseId)}>
                      {savedExerciseIds?.some((savedExerciseId) => savedExerciseId === exercise.exerciseId)
                      ? 'SAVED!'
                       : 'ADD EXERCISE'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </div>
  );
};

export default SearchExercises;