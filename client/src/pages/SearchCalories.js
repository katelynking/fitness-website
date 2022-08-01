import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Button, Card, CardColumns, Dropdown, DropdownButton } from 'react-bootstrap';

import Auth from '../utils/auth';

import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';


const SearchCalories = () => {
  const [exerciseList] = useState([
    "Lifting",
    "Run",
    "Walking",
    "Jogging",
    "Basketball",
    "Football",
    "Baseball"
  ]);

  // create state for holding returned google api data
  const [searchedCalories, setSearchedCalories] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
//   const [savedCalorieIds, setSavedCalorieIds] = useState(getSavedBookIds());

//   const [saveBook] = useMutation(SAVE_BOOK);
//   // set up useEffect hook to save `savedCalorieIds` list to localStorage on component unmount
//   // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
//   useEffect(() => {
//     return () => saveBookIds(savedCalorieIds);
//   });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (searchInput) => {
    // event.preventDefault();

    // if (!searchInput) {
    //   return false;
    // }

      try {
   
        const url = `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${searchInput.toLowerCase()}`

        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "6ac7ece7aamsh9369ca45e027031p1ab0fbjsn1c8c1f20dd0d",
            "X-RapidAPI-Host": "calories-burned-by-api-ninjas.p.rapidapi.com",
          },
        };

        
        const resEx = await fetch(url, options);
        const res = await resEx.json();
          console.log(res);
      

      const bookData = res.map((book) => ({
        exerciseId: Math.floor(Math.random() * 1000000000),
        name: book.name,
        calories: book.calories_per_hour,
        duration: book.duration_minutes,
        totalCal: book.total_calories,

      }));

      setSearchedCalories(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleExerciseSelection = async (searchInput) => {
    // find the exercise in `searchedExercises` state by the matching id
    console.log(searchInput);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    handleFormSubmit(searchInput);
    if (!token) {
      return false;
    }

    try {
      // const response = await saveBook(bookToSave, token);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // if exercise successfully saves to user's account, save exercise id to state
      setSearchInput("chest");
    } catch (err) {
      console.error(err);
    }
  
  };

  // create function to handle saving a book to our database
//   const handleSaveBook = async (bookId) => {
//     // find the book in `searchedCalories` state by the matching id
//     const bookToSave = searchedCalories.find((book) => book.bookId === bookId);

//     // get token
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const response = await saveBook(bookToSave, token);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       // if book successfully saves to user's account, save book id to state
//       setSavedCalorieIds([...savedCalorieIds, bookToSave.bookId]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  return (
    
      <div className='container-background centered'>
        <div>
        <Container fluid>
          <span className='exercise-search-font'>CALORIC EXPENDITURE</span>
          <DropdownButton id="dropdown-basic-button" title="SELECT ACTIVITY">
            {exerciseList.map((searchInput) => {
              return (
                <Dropdown.Item
                  key={searchInput}
                  data-exercise={searchInput}
                  target={searchInput}
                  onClick={(e) => {
                    handleExerciseSelection(
                      e.target.getAttribute("data-exercise")
                    );
                  }}
                >
                  {searchInput}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Container>
      </div>
      

      <Container as='container'>
        <span className='white-font'>
          {searchedCalories.length
            ? `Viewing ${searchedCalories.length} results:`
            : 'Search for an activity to begin'}
        </span>
        <CardColumns>
          {searchedCalories.map((book) => {
            return (
              <Card className='card-body' key={book.id} border='dark'>
                <Card.Body>
                <Card.Title>{book.name}</Card.Title>
                  <p className='small'>Cals per hour: {book.calories}</p>
                  <p className='small'>Duration: {book.duration}</p>
                  <Card.Text>Total Cals: {book.totalCal}</Card.Text>
                  {/* {Auth.loggedIn() && (
                    <Button
                      disabled={savedCalorieIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedCalorieIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save!'}
                    </Button>
                  )} */}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </div>
  );
};

export default SearchCalories;