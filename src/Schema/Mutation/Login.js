const { GraphQLString } = require("graphql");
const { knex } = require("../../db/knex");
const { LoginType } = require("../TypeDefs/Login");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports.LOGIN = {
  type: LoginType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(perent, args, { req, res }) {
    const { email, password } = args;
    const data = await knex("users").select().where("email", email).first();
    if (!data) {
      return null;
    }
    const valid = await bcrypt.compare(password, data.password);
    if (!valid) {
      return null;
    }
    const accessToken = sign(
      { userId: data.user_id, level: data.level },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15min",
      }
    );
    const refreshToken = sign(
      { userId: data.user_id, level: data.level },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("refresh-token", refreshToken, { expire: 60 * 60 * 24 * 7 });
    res.cookie("access-token", accessToken, { expire: 60 * 15 });
    return data;
  },
};
