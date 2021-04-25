const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
// Allows express to understand graphQL
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

dotenv.config();
app.use(cors());

mongoose.connect(
  `mongodb+srv://ether200:${process.env.BEEP}@cluster0.iegop.mongodb.net/gql-ninja`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

// This FN takes a schema
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Now listening for request on port 4000");
});
