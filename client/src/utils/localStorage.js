export const getSavedExerciseIds = () => {
  const savedExerciseIds = localStorage.getItem('saved_exercises')
    ? JSON.parse(localStorage.getItem('saved_exercises'))
    : [];

  return savedExerciseIds;
};

export const saveExerciseIds = (exerciseIdArr) => {
  if (exerciseIdArr.length) {
    localStorage.setItem('saved_exercises', JSON.stringify(exerciseIdArr));
  } else {
    localStorage.removeItem('saved_exercises');
  }
};

export const removeExerciseId = (exerciseId) => {
  const savedExerciseIds = localStorage.getItem('saved_exercises')
    ? JSON.parse(localStorage.getItem('saved_exercises'))
    : null;

  if (!savedExerciseIds) {
    return false;
  }

  const updatedSavedExerciseIds = savedExerciseIds?.filter((savedExerciseId) => savedExerciseId !== exerciseId);
  localStorage.setItem('saved_exercises', JSON.stringify(updatedSavedExerciseIds));

  return true;
};

// =========================================================================

export const getSavedCalorieIds = () => {
  const savedCalorieIds = localStorage.getItem('saved_calories')
    ? JSON.parse(localStorage.getItem('saved_calories'))
    : [];

  return savedCalorieIds;
};

export const saveCalorieIds = (calorieIdArr) => {
  if (calorieIdArr.length) {
    localStorage.setItem('saved_calories', JSON.stringify(calorieIdArr));
  } else {
    localStorage.removeItem('saved_calories');
  }
};

export const removeCalorieId = (calorieId) => {
  const savedCalorieIds = localStorage.getItem('saved_calories')
    ? JSON.parse(localStorage.getItem('saved_calories'))
    : null;

  if (!savedCalorieIds) {
    return false;
  }

  const updatedSavedCalorieIds = savedCalorieIds?.filter((savedCalorieId) => savedCalorieId !== calorieId);
  localStorage.setItem('saved_calories', JSON.stringify(updatedSavedCalorieIds));

  return true;
};