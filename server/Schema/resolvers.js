const { Book } = require('../models');

const resolvers = {
  Query: {
    book: async () => {
      return Book.find({});
    },
    // matchups: async (parent, { _id }) => {
    //   const params = _id ? { _id } : {};
    //   return U.find(params);
    // },
  },
  Mutation: {


    // Query: {
//   ...
// },
Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) {
        user.token = Buffer.from(email).toString('base64');
        return user;
      }
    },
  },
  
    createMatchup: async (parent, args) => {
      const matchup = await User.create(args);
      return User;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;