const cors = require('cors');

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');

const mongoose = require('mongoose');
const secrets = require('../secrets.json');

const app = express();
app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }),
  );  

const uri = secrets.atlas_uri;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("connected to mongoDB database successfully");
});

app.listen(4000, () => {console.log("started server on port 4000")});
