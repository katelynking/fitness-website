const { Schema } = require("mongoose");

const calorieSchema = new Schema({
  calories: {
    type: String,
    required: true,
  },
  exerciseId: {
    type: String,
    required: true,
  },
  totalCal: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
});

module.exports = calorieSchema;