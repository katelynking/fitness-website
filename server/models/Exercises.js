const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const exerciseSchema = new Schema({
  bodyPart: {
    type: String,
    required: true,
  },
  exerciseId: {
    type: String,
    required: true,
  },
  gifUrl: {
    type: String,
  },
  equipment: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
});

module.exports = exerciseSchema;
