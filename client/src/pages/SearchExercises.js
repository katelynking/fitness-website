import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Auth from "../utils/auth";
// import { saveBook, searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

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
  const [searchedExercise, setSearchedExercise] = useState([]);
  // create state for holding our search field data
  const [exercise, setExercise] = useState("");

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [saveBook] = useMutation(SAVE_BOOK);
  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
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

      const exerciseData = res.map((book) => ({
        id: book.id,
        name: book.name,
        bodyPart: book.bodyPart,
        target: book.target,
        equipment: book.equipment,
        image: book.gifUrl,

        // const { items } = await response.json();

        // const bookData = items.map((book) => ({
        //   bookId: book.id,
        //   authors: book.volumeInfo.authors || ['No author to display'],
        //   title: book.volumeInfo.title,
        //   description: book.volumeInfo.description,
        //   image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));
      // console.log(bookData);
      setSearchedExercise(exerciseData);
      setExercise("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleExerciseSelection = async (exercise) => {
    // find the book in `searchedExercise` state by the matching id
    console.log(exercise);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    handleFormSubmit(exercise);
    if (!token) {
      return false;
    }

    try {
      // const response = await saveBook(bookToSave, token);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // if book successfully saves to user's account, save book id to state
      setExercise("chest");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='container-background centered'>
      <div fluid className="vibrant">
        <Container >
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

      <Container>
        <span className='white-font'>
          {searchedExercise.length
            ? `Viewing ${searchedExercise.length} results:`
            : "Search for an exercise to begin"}
        </span>
        <CardColumns>
          {searchedExercise.map((book) => {
            return (
              <Card key={book.id} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.name}</Card.Title>
                  <p className="small">Exercise: {book.name}</p>
                  <p className="small">Body Part: {book.bodyPart}</p>
                  <p className="small">Target: {book.target}</p>
                  <Card.Text>Equipment: {book.equipment}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some(
                        (savedBookId) => savedBookId === book.bookId
                      )}
                      className="btn-block btn-info add-btn"
                      // onClick={() => handleSaveBook(book.bookId)}>
                      // {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                      // ? 'This exercise has already been saved!'
                      // : 'Save this Exercise!'}
                    >
                      ADD EXERCISE
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
