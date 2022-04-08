import bodyParser from "body-parser";
import express from "express";
import axios from "axios";
import passport from "passport";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import dotenv from "dotenv";

import connectDB from "../config/database";
import AppRouter from "./routes";
import { AuthMiddleware } from "./middlewares/auth.middleware";

const authMiddleware = new AuthMiddleware();
dotenv.config();
const app = express();
const router = new AppRouter(app);

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 7000);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
authMiddleware.useLocalStrategy();
authMiddleware.useJWTStrategy();
authMiddleware.serializeUser();
authMiddleware.deserializeUser();

router.init();

// TODO: Move that to model GraphQL
const schema = buildSchema(`
  type Query {
    todos: String
  }
`);

// TODO: Create graphQL controller
const rootValue = {
  todos: async () => {
    // TODO: Create http service for that
    const todos = await axios.get("http://localhost:5000/api/todos");
    return todos.data;
  },
};

// TODO: Move that to router init function
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

const port = app.get("port");
const server = app.listen(port, () =>
  // tslint:disable-next-line:no-console
  console.log(`Server started on port ${port}`)
);

export default server;
