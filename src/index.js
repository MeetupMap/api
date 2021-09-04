const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { PrismaClient } = require('@prisma/client')
const schema = require('./schema.js');


const app = express();
app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }),
  );  


const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`started server on port ${port}`)});

