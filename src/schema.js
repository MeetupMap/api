const tools = require('graphql-tools');
const helloResolve = require('../schema/hello.js');
const byeResolve = require('../schema/bye.js');
const gql = require('graphql-tag').gql;

const Query = gql`
    type Query {
        hello: Greeting
        bye: String
    }

    type Greeting {
        greeting: String
        kind: Int
    }
`;

const schema = tools.makeExecutableSchema({
    typeDefs: [Query],
    resolvers: [helloResolve, byeResolve],
});

module.exports = schema;

