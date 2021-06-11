const tools = require('graphql-tools');
const helloResolve = require('../schema/hello.js');
const byeResolve = require('../schema/bye.js');

const Query = `
    type Query {
        hello: String
        bye: String
    }
`;

const schema = tools.makeExecutableSchema({
    typeDefs: [Query],
    resolvers: [helloResolve, byeResolve],
});

module.exports = schema;

