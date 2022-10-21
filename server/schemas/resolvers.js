const { User } = require("../models");
const { signToken } = require("../utils/auth");

const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello mathew!";
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addSavedBook: async (parent, args, context) => {
      if (context.user) {
        //const thought = await Thought.create({ ...args, username: context.user.username });

        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: { ...args } } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeSavedBook: async (parent, { bookId }, context) => {
      if (context.user) {
        //const thought = await Thought.create({ ...args, username: context.user.username });

        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
