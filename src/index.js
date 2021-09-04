const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { PrismaClient } = require('@prisma/client')
const schema = require('./schema.js');


const app = express();
const prisma = new PrismaClient() 

async function test() {

  const newUser = await prisma.user.create({
    data: {
      id: "1",
      name: "test1",
      email: "test@gmail.com",
    }
  })

  const users = await prisma.user.findMany()
  console.log(users)
  console.log("hello")
}
test()

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

