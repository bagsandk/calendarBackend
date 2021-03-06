const {
  GraphQLEnumType,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} = require("graphql");
const { convertToDate } = require("../../Utils/convertToDate");
module.exports.UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    user_id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    level: { type: LevelType },
    created_at: {
      type: GraphQLString,
      resolve(parent) {
        return convertToDate(parent.created_at);
      },
    },
  }),
});

const LevelType = new GraphQLEnumType({
  name: "level",
  values: {
    ADMIN: { value: "admin" },
    USER: { value: "user" },
  },
});
