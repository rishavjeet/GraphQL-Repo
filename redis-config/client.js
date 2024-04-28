const { createClient } = require("redis");

const client = createClient();

client.on("error", () =>
  console.log("error occurred while connecting to redis")
);

module.exports = {
  client,
};
