const {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} = require("graphql");
const { knex } = require("../../db/knex");
const { convertToDate } = require("../../Utils/convertToDate");
const { CalendarType, CreatedByType } = require("./Calendar");
const InputEventType = new GraphQLObjectType({
  name: "EventInput",
  fields: () => ({
    event_id: { type: GraphQLID },
    title: { type: GraphQLString },
    created_by: { type: GraphQLInt },
    calendar_id: { type: CalendarType },
    desc: { type: GraphQLString },
    start_date: { type: GraphQLString },
    finish_date: { type: GraphQLString },
    created_at: { type: GraphQLString , resolve(parent) {
      return convertToDate(parent.created_at);
    },},
  }),
});
const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    event_id: { type: GraphQLID },
    title: { type: GraphQLString },
    calendar_id: {
      type: CalendarType,
      resolve(parent, args) {
        return knex
          .select(
            "calendar_id",
            "calendar_name",
            "created_by",
            "status",
            "created_at"
          )
          .from("calendar")
          .where({
            calendar_id: parent.calendar_id,
          })
          .first();
      },
    },
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
    desc: { type: GraphQLString },
    start_date: {
      type: GraphQLString,
      resolve(parent) {
        return convertToDate(parent.start_date);
      },
    },
    finish_date: {
      type: GraphQLString,
      resolve(parent) {
        return convertToDate(parent.finish_date);
      },
    },
    created_at: {
      type: GraphQLString,
      resolve(parent) {
        return convertToDate(parent.created_at_date);
      },
    },
  }),
});

module.exports = { EventType, InputEventType };
