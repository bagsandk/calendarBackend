const { GraphQLList, GraphQLInt, GraphQLObjectType } = require("graphql");
const { knex } = require("../../db/knex.js");
const { getAllUser, getOneUser } = require("../../db/model/User.js");
const { UserType } = require("../TypeDefs/User.js");

module.exports.ME = {
  type: UserType,
  resolve(_, __, ctx) {
    if (!ctx.userId) {
      return null;
    }
    const data = getOneUser(ctx.userId);
    return data;
  },
};
