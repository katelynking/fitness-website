const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  // price: {
  //   type: Number,
  //   required: true,
  //   min: 0.99
  // },
  // quantity: {
  //   type: Number,
  //   min: 0,
  //   default: 0
  // },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Exercise = mongoose.model('Product', exerciseSchema);

module.exports = Exercise;
