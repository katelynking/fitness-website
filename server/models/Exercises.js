const { Schema } = require('mongoose');


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
