const { GraphQLString, GraphQLInt, GraphQLObjectType } = require("graphql");
const { CalendarType, InputCalendarType } = require("../TypeDefs/Calendar.js");
const { v4: uuidv4 } = require("uuid");

const {
  insertCalendar,
  updateCalendar,
  deleteCalendar,
} = require("../../db/model/Calendar.js");

module.exports.CREATE_CALENDAR = {
  type: InputCalendarType,
  args: {
    calendar_name: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  async resolve(parent, args, ctx) {
    if (!ctx.userId) {
      return null;
    }
    const { calendar_name, status } = args;
    await insertCalendar({
      calendar_name,
      status,
      created_by: ctx.userId,
      uri: uuidv4(),
    });
    return args;
  },
};
module.exports.UPDATE_CALENDAR = {
  type: InputCalendarType,
  args: {
    id: { type: GraphQLInt },
    calendar_name: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  async resolve(parent, args, ctx) {
    if (!ctx.userId) {
      return null;
    }
    const { id, calendar_name, status } = args;

    await updateCalendar(id, { calendar_name, status });
    return args;
  },
};
module.exports.APPROVE_CALENDAR = {
  type: InputCalendarType,
  args: {
    id: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    const { id } = args;
    await updateCalendar(id, { status: "approve" });
    return args;
  },
};
module.exports.REJECT_CALENDAR = {
  type: InputCalendarType,
  args: {
    id: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    const { id } = args;
    await updateCalendar(id, { status: "reject" });
    return args;
  },
};
module.exports.DELETE_CALENDAR = {
  type: InputCalendarType,
  args: {
    calendar_id: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    const { calendar_id } = args;
    await deleteCalendar(calendar_id);
    return args;
  },
};
