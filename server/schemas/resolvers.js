const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context.user);
      // const userData = await User.find({})
      // return userData
      if (context.user) {
        const userData = await User.findOne({
          _id: context.user._id,
        }).select("-__v -password");
        return userData;
      }
      throw new AuthenticationError("not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      console.log(args);
      const user = await User.create(args);
      const token = signToken(user);
      console.log(token, user);
      return { user, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("no user found");
      }
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("incorrect password");
      }
      const token = signToken(user);
      return { user, token };
    },
    saveExercises: async (parent, { exerciseData }, context) => {
      console.log(
        "savedExercise",
        new AuthenticationError(`${context.user._id}`).message
      );
      // const { exerciseId } = exerciseData;
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedExercises: exerciseData } },
          { new: true }
        );
        console.log(updatedUser);
        return updatedUser;
      }
      throw new AuthenticationError(`SAVE EXERCISE FAILED`);
    },
    removeExercise: async (parent, { exerciseId }, context) => { 
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: {savedExercises: { exerciseId }} },
          { new: true }
        );
        console.log(`here is the ` + updatedUser);
        return updatedUser;
      }
      throw new AuthenticationError("ERROR");
    },
    saveCalories: async (parent, { calorieData }, context) => {
      console.log(
        // "savedCalories",calorieData
       new AuthenticationError(`save the ${calorieData}`).message
      );
      const { calorieId } = calorieData;
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedCalories: calorieData } },
          { new: true }
        );
        return updatedUser;
      }
      console.log("You need to be logged in!");
      throw new AuthenticationError();
    }
  },
};

module.exports = resolvers;
