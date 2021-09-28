const { GraphQLList, GraphQLInt } = require("graphql");
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
