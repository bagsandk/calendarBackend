const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const { LevelType } = require("./User.js");

module.exports.LoginType = new GraphQLObjectType({
  name: "LoginType",
  fields: () => ({
    user_id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    level: { type: GraphQLString },
  }),
});
