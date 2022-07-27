const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (
            context.User
        ) {
            const userData = User.findOne({
                _id: context.user._id
            })
            .select("-__v -password")
            return userData;
        }
        throw new AuthenticationError('not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne(
        { email },
      );
      if (!user) {
        throw new AuthenticationError('no user found')
      }
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError('incorrect password')
      }
      const token = signToken(user);
      return { user, token };
    },
  },
};

module.exports = resolvers;
