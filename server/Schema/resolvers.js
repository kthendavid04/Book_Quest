const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { resolvers } = require('.');

const resolvers = {
  Query: {
    book: async (context) => {
        if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
            return userData;
        }
        throw new AuthenticationError('Please log into library.');
    }
  },

  
  Mutation: {

    addUser: async (args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async ({ email, password }) => {
      const user = await User.findOne( { email });
      if (!user) {
        throw new AuthenticationError('Incorrect e-mail. Please try again.')
      }

      const PwCorrect = await user.isCorrectPassword(password);
      if(!PwCorrect) {
        throw new AuthenticationError('Incorrect password. Please tru again')
      }
    
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async ({ book }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: {savedBook: book} },
          { new: true }
          )
        return updatedUser;
      }

      throw new AuthenticationError('Please log in if you want to save your book.')
    },

    removeBook: async ({ bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findAndUpdate(
          {_id: context.user._id},
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        )
        return updatedUser;
      }
    } 
  }
};


module.exports = resolvers