const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const {
  CREATE_CALENDAR,
  UPDATE_CALENDAR,
  DELETE_CALENDAR,
  APPROVE_CALENDAR,
  REJECT_CALENDAR,
} = require("./Mutation/Calendar.js");
const {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} = require("./Mutation/Event.js");
const { LOGIN } = require("./Mutation/Login.js");
const { LOGOUT } = require("./Mutation/Logout.js");
const { CREATE_USER } = require("./Mutation/User.js");
const {
  GET_CALENDAR,
  GET_CALENDARS,
  GET_CALENDAR_BY_USER,
} = require("./Query/Calendar.js");
const {
  GET_EVENT,
  GET_EVENTS,
  GET_EVENT_BY_USER,
} = require("./Query/Event.js");
const { ME } = require("./Query/Me.js");
const { GET_USER, GET_USERS } = require("./Query/User.js");

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getUser: GET_USER,
    getUsers: GET_USERS,
    getCalendar: GET_CALENDAR,
    getCalendars: GET_CALENDARS,
    getCalendarsByUser: GET_CALENDAR_BY_USER,
    getEvent: GET_EVENT,
    getEvents: GET_EVENTS,
    getEventsByUser: GET_EVENT_BY_USER,
    me: ME,
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    createCalendar: CREATE_CALENDAR,
    updateCalendar: UPDATE_CALENDAR,
    deleteCalendar: DELETE_CALENDAR,
    createEvent: CREATE_EVENT,
    updateEvent: UPDATE_EVENT,
    deleteEvent: DELETE_EVENT,
    approveCalendar: APPROVE_CALENDAR,
    rejectCalendar: REJECT_CALENDAR,
    login: LOGIN,
    logout: LOGOUT,
  },
});

module.exports.schema = new GraphQLSchema({
  query: rootQuery,
  mutation: mutation,
});
