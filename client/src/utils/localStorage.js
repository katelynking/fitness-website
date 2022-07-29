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
