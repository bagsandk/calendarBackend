const cors = require("cors");
require('dotenv').config()
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./Schema/index.js");
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");

const main = async () => {
  const app = express();
  const PORT = 5000;
  var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // <-- REQUIRED backend setting
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use((req, res, next) => {
    const accessToken = req.cookies["access-token"];
    try {
      const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.userId = data.userId;
    } catch {}
    console.log(req.userId);
    next();
  });
  app.use(
    "/graphql",
    graphqlHTTP(async (req, res, graphQLParams) => ({
      schema,
      graphiql: true,
    }))
  );
  app.listen(PORT, () => {
    console.info("Server runing");
  });
};

main().catch((err) => {
  console.error(err);
});
