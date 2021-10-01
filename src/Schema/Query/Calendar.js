const { GraphQLList, GraphQLInt, GraphQLString } = require("graphql");
const { knex } = require("../../db/knex.js");
const {
  getAllCalendar,
  getOneCalendar,
  getCalendarByUser,
} = require("../../db/model/Calendar.js");
const { CalendarType } = require("../TypeDefs/Calendar.js");

module.exports.GET_CALENDARS = {
  type: new GraphQLList(CalendarType),
  resolve() {
    const data = getAllCalendar();
    return data;
  },
};
module.exports.GET_CALENDAR = {
  type: CalendarType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent, args) {
    const { id } = args;
    return getOneCalendar(id);
  },
};
module.exports.GET_CALENDAR_BY_URI = {
  type: CalendarType,
  args: {
    uri: { type: GraphQLString },
  },
  resolve(parent, args) {
    const { uri } = args;
    const data = knex
      .select(
        "calendar_id",
        "calendar_name",
        "created_by",
        "status",
        "uri",
        "created_at"
      )
      .from("calendar")
      .where({
        uri: uri,
      })
      .first();
    if (data) {
      return data;
    }
    return null;
  },
};
module.exports.GET_CALENDAR_BY_USER = {
  type: new GraphQLList(CalendarType),
  args: {
    user_id: { type: GraphQLInt },
  },
  resolve(parent, args) {
    const { user_id } = args;
    return getCalendarByUser(user_id);
  },
};
