export default {
  Query: {
    currentUser: async (_, __, { request, user }, info) => {
      return user;
    }
  }
};
