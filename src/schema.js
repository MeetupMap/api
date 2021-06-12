const tools = require('graphql-tools');
const user = require('../schema/user.js');
const meetup = require('../schema/meetup.js');
const gql = require('graphql-tag').gql;

const Query = gql`
    type Mutation {
        createUser(userID: String!, name: String!, email: String!): User 
    }

    type Query {
        user(userID: String!): User
        meetup(meetupID: String!): Meetup
    }

`;  

const schema = tools.makeExecutableSchema({
    typeDefs: [Query, user.typedefs, meetup.typedefs],
    resolvers: [user.resolver, meetup.resolver],
});

module.exports = schema;

