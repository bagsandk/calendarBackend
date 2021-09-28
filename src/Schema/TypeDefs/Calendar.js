const {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} = require("graphql");
const { knex } = require("../../db/knex");
const InputCalendarType = new GraphQLObjectType({
  name: "CalendarInput",
  fields: () => ({
    calendar_id: { type: GraphQLID },
    calendar_name: { type: GraphQLString },
    created_by: { type: GraphQLInt },
    uri: { type: GraphQLString },
    status: { type: StatusType },
    created_at: { type: GraphQLString },
  }),
});
const CalendarType = new GraphQLObjectType({
  name: "Calendar",
  fields: () => ({
    calendar_id: { type: GraphQLID },
    calendar_name: { type: GraphQLString },
    created_by: {
      type: CreatedByType,
      resolve(parent, args) {
        return knex
          .select("user_id as id", "name")
          .from("users")
          .where({
            user_id: parent.created_by,
          })
          .first();
      },
    },
    uri: { type: GraphQLString },
    status: { type: StatusType },
    created_at: { type: GraphQLString },
  }),
});

const CreatedByType = new GraphQLObjectType({
  name: "CreatedBy",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

const StatusType = new GraphQLEnumType({
  name: "status",
  values: {
    APPROVE: { value: "approve" },
    REJECT: { value: "reject" },
    WAITING: { value: "waiting" },
  },
});
module.exports = { CalendarType, InputCalendarType, CreatedByType };
