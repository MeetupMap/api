const tools = require('graphql-tools');
const hello = require('../schema/hello.js');
const bye = require('../schema/bye.js');
const gql = require('graphql-tag').gql;

const Query = gql`
    type Query {
        hello: Greeting
        bye: Goodbye
    }
`;

const schema = tools.makeExecutableSchema({
    typeDefs: [Query, hello.query, bye.query],
    resolvers: [hello.resolver, bye.resolver],
});

module.exports = schema;

