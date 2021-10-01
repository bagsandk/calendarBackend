const { GraphQLList, GraphQLInt } = require("graphql");
const {
  getAllEvent,
  getOneEvent,
  getEventByUserAndCalendar,
} = require("../../db/model/Event.js");
const { EventType } = require("../TypeDefs/Event.js");

module.exports.GET_EVENTS = {
  type: new GraphQLList(EventType),
  resolve() {
    return getAllEvent();
  },
};
module.exports.GET_EVENT = {
  type: EventType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent, args) {
    const { id } = args;
    return getOneEvent(id);
  },
};
module.exports.GET_EVENT_BY_USER = {
  type: new GraphQLList(EventType),
  args: {
    calendar_id: { type: GraphQLInt },
  },
  async resolve(parent, args, ctx) {
    const { calendar_id } = args;
    if (!ctx.userId) {
      return null;
    }
    const data = await getEventByUserAndCalendar(ctx.userId, calendar_id);
    console.log(data)
    return data;
  },
};
