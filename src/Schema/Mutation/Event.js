const { GraphQLString, GraphQLInt, GraphQLObjectType } = require("graphql");
const { EventType, InputEventType } = require("../TypeDefs/Event.js");
const {
  insertEvent,
  updateEvent,
  deleteEvent,
} = require("../../db/model/Event.js");

module.exports.CREATE_EVENT = {
  type: InputEventType,
  args: {
    calendar_id: { type: GraphQLInt },
    title: { type: GraphQLString },
    desc: { type: GraphQLString },
    start_date: { type: GraphQLString },
    finish_date: { type: GraphQLString },
  },
  async resolve(parent, args, ctx) {
    if (!ctx.userId) {
      return null;
    }
    const { calendar_id, title, start_date, finish_date, desc } = args;
    await insertEvent({
      title,
      calendar_id,
      desc,
      start_date,
      finish_date,
      created_by: ctx.userId,
    });
    return args;
  },
};
module.exports.UPDATE_EVENT = {
  type: InputEventType,
  args: {
    id: { type: GraphQLInt },
    calendar_id: { type: GraphQLInt },
    desc: { type: GraphQLString },
    title: { type: GraphQLString },
    start_date: { type: GraphQLString },
    finish_date: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const {
      id,
      calendar_id,
      title,
      start_date,
      finish_date,
      desc,
    } = args;

    await updateEvent(id, {
      title,
      calendar_id,
      desc,
      start_date,
      finish_date,
      created_by,
    });
    return args;
  },
};

module.exports.DELETE_EVENT = {
  type: InputEventType,
  args: {
    event_id: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    const { event_id } = args;
    await deleteEvent(event_id);
    return args;
  },
};
