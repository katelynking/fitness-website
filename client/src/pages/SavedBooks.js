import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { getMe, deleteBook } from "../utils/API";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  const [caloriesList] = useState(["Running", "Skiing", "Football", "Lifting"]);

  const [userData, setUserData] = useState({});

  const [searchedCals, setSearchedCals] = useState([]);

  const [calories, setCalories] = useState("");

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  const handleFormSubmit = async (calories) => {
    console.log(calories);

    try {
      const url = `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${calories.toLowerCase()}`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "6ac7ece7aamsh9369ca45e027031p1ab0fbjsn1c8c1f20dd0d",
          "X-RapidAPI-Host": "calories-burned-by-api-ninjas.p.rapidapi.com",
        },
      };

      const res = await fetch(url, options);
      const response = await res.json();
      console.log(response);

      const caloriesData = response.map((cal) => ({
        name: cal.name,
        burned: cal.calories_per_hour,
        duration: cal.duration_minutes,
        totalCal: cal.total_calories,
      }));
      setSearchedCals(caloriesData);
      setCalories("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook(bookId, token);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return 
    <h2 className='loading'>LOADING...</h2>
  }

  const handleCalorieSelection = async (calories) => {
    console.log(calories);

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    handleFormSubmit(calories);
    if (!token) {
      return false;
    }

    try {
      // const response = await saveBook(bookToSave, token);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // if book successfully saves to user's account, save book id to state
      setCalories("lifting");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved exercises!</h1>
          <DropdownButton id="dropdown-basic-button" title="Pick Body Part">
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
          </DropdownButton>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved exercises!"}
        </h2>
        <CardColumns>
          {searchedCals.map((cal) => {
            return (
              <Card key={cal.name} border="dark">
                {/* {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${cal.name}`}
                    variant="top"
                  />
                ) : null} */}
                <Card.Body>
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
          })}
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this exercise!
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

export default SavedBooks;
