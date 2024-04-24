const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

const taskData = [
  {
    id: 1,
    title: "something title",
    description: "Ad aute cupidatat sit in.",
    completed: false,
  },
  {
    id: 2,
    title: "something lorem title",
    description:
      "Dolore ullamco officia qui aute magna Lorem exercitation commodo eiusmod ut id Lorem voluptate.",
    completed: false,
  },
  {
    id: 3,
    title: "something fake title",
    description:
      "Eiusmod sit ullamco aliquip Lorem tempor dolor qui esse ut sint velit magna consectetur.",
    completed: false,
  },
  {
    id: 1,
    title: "something trial title",
    description:
      "Fugiat nisi ut exercitation ipsum aliqua deserunt in elit adipisicing pariatur.",
    completed: false,
  },
];

async function startTodoServer() {
  const server = new ApolloServer({
    // Here define the required  configurations for resolvers and type definitions
    /**
     * In typeDefs we define the type of data and it's schema / structure
     * `!` - denotes compaulsory fields
     * Query - define the type of query we want to perform and what will be it's intended outcomes.
     * 			Here we have query `getTasks` which returns a list of Tasks
     */
    typeDefs: `
		type Task{
			id: ID!
			title: String!,
			description: String!,
			completed: Boolean!,
		}

		type Query{
			getTasks: [Task]
		}
	`,
    // Resolvers helps tp resolve the graphql queries in order to cater the intended results
    resolvers: {
      Query: {
        getTasks: async () => taskData,
      },
    },
  });

  await server.start();

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("Server up and running at port 8000"));
}

startTodoServer();
