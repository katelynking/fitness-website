import React, { useState, useEffect } from "react";
import {
  // Jumbotron,
  Container,
  Button,
  Card,
  CardColumns,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import mongoose from "mongoose";

import Auth from "../utils/auth";

import { saveCalorieIds, getSavedCalorieIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_CALORIES } from "../utils/mutations";

const SearchCalories = () => {
  const [exerciseList] = useState([
    "Lifting",
    "Run",
    "Walking",
    "Jogging",
    "Basketball",
    "Football",
    "Baseball",
  ]);

  // create state for holding returned google api data
  const [searchedCalories, setSearchedCalories] = useState([]);
  // create state for holding our search field data
  const [calories, setCalories] = useState("");

  const calorieId = new mongoose.Types.ObjectId();

  // create state to hold saved bookId values
  const [savedCalorieIds, setSavedCalorieIds] = useState(getSavedCalorieIds());

  // const [saveCalories] = useMutation(SAVE_CALORIES);
  const [saveCalories, { error }] = useMutation(SAVE_CALORIES);
  //   // set up useEffect hook to save `savedCalorieIds` list to localStorage on component unmount
  //   // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveCalorieIds(savedCalorieIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (calories) => {
    // event.preventDefault();
    console.log(calories);
    // if (!calories) {
    //   return false;
    // }

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

      const resEx = await fetch(url, options);
      const res = await resEx.json();
      console.log(res);



      const calorieData = res.map((calories) => ({
        // calorieId: "test123",
        name: calories.name,
        calories: calories.calories_per_hour,
        duration: calories.duration_minutes,
        totalCal: calories.total_calories,
      }));

      setSearchedCalories(calorieData);
      setCalories("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCalorieSelection = async (calories) => {
    // find the exercise in `searchedExercises` state by the matching id
    console.log(calories);
    // get token
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

      // if exercise successfully saves to user's account, save exercise id to state
      setCalories("lifting");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a calories to our database
  const handleSaveCalories = async (calorieId) => {
    // find the calories in `searchedCalories` state by the matching id
    const calorieToSave = searchedCalories.find(
      (calories) => calories.calorieId === calorieId
    );
    console.log(calories);
    //     // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      //       const response = await saveBook(bookToSave, token);

      //       if (!response.ok) {
      //         throw new Error('something went wrong!');
      //       }
      console.log(calorieToSave);
      const { data } = await saveCalories({
        variables: { calorieData: { ...calorieToSave } },
      });
      console.log(error, data);
      console.log(savedCalorieIds, data);

      //       // if calories successfully saves to user's account, save calories id to state
      setSavedCalorieIds([...savedCalorieIds, calorieToSave.calorieId]);
    } catch (err) {
      console.error(err, "Save error");
    }
  };

  return (
    <div className="container-background centered">
      <div>
        <Container fluid>
          <span className="exercise-search-font">CALORIC EXPENDITURE</span>
          <DropdownButton id="dropdown-basic-button" title="SELECT ACTIVITY">
            {exerciseList.map((calories) => {
              return (
                <Dropdown.Item
                  key={calories}
                  data-exercise={calories}
                  target={calories}
                  onClick={(e) => {
                    handleCalorieSelection(
                      e.target.getAttribute("data-exercise")
                    );
                  }}
                >
                  {calories}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Container>
      </div>

      <Container as="container">
        <span className="white-font">
          {searchedCalories.length
            ? `Viewing ${searchedCalories.length} results:`
            : "Search for an activity to begin"}
        </span>
        <CardColumns>
          {searchedCalories.map((calories) => {
            return (
              <Card
                className="card-body"
                key={calories.calorieId}
                border="dark"
              >
                <Card.Body>
                  <Card.Title>{calories.name}</Card.Title>
                  <p className="small">Cals per hour: {calories.calories}</p>
                  <p className="small">Duration: {calories.duration}</p>
                  <Card.Text>Total Cals: {calories.totalCal}</Card.Text>
                  {/* {Auth.loggedIn() && (
                    <Button
                      disabled={savedCalorieIds?.some(
                        (savedCalorieId) =>
                          savedCalorieId === calories.calorieId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveCalories(calories.calorieId)}
                    >
                      {savedCalorieIds?.some(
                        (savedCalorieId) =>
                          savedCalorieId === calories.calorieId
                      )
                        ? "SAVED!"
                        : "ADD ACTIVITY"}
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
