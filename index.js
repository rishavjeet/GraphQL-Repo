const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

const { client } = require("./redis-config/client");
const { getProductsRoute } = require("./Routes/productRoutes");

// Fake data for testing the graphql endpoint
const fakeData = [
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
  await client.connect();
  const server = new ApolloServer({
    typeDefs: `
		type Todo{
			id: ID!
			title: String!,
			completed: Boolean!,
			user: User
		}

		type User{
			id: ID!
			name: String!
			username: String!
			email: String!
			phone: String!
		}

		type Query{
			getTodos: [Todo]
			getUsers: [User]
			getUser(id: ID!): User
		}
	`,
    resolvers: {
      Todo: {
        user: async (todo) =>
          (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.userId}`
            )
          ).data,
      },
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getUser: async (parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
      },
    },
  });

  await server.start();

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/graphql", expressMiddleware(server));
  app.get("/getProductList", getProductsRoute);

  app.listen(8000, () => console.log("Server up and running at port 8000"));
}

startTodoServer();
