const { GraphQLList, GraphQLInt } = require("graphql");
const { knex } = require("../../db/knex.js");
const { getAllUser, getOneUser } = require("../../db/model/User.js");
const { UserType } = require("../TypeDefs/User.js");

module.exports.GET_USERS = {
  type: new GraphQLList(UserType),
  resolve() {
    return getAllUser();
  },
};
module.exports.GET_USER = {
  type: new GraphQLList(UserType),
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent, args) {
    const { id } = args;
    return getOneUser(id);
  },
};
