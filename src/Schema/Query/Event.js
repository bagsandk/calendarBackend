const { GraphQLList, GraphQLInt } = require("graphql");
const {
  getAllEvent,
  getOneEvent,
  getEventByUser,
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
    user_id: { type: GraphQLInt },
  },
  resolve(parent, args) {
    const { user_id } = args;
    return getEventByUser(user_id);
  },
};
