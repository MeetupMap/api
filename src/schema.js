const tools = require('graphql-tools');
const user = require('../schema/user.js');
const meetup = require('../schema/meetup.js');
const gql = require('graphql-tag').gql;

const Query = gql`
    type Query {
        user(userID: String!): User
        meetup(meetupID: String!): Meetup
    }
`;

const schema = tools.makeExecutableSchema({
    typeDefs: [Query, user.query, meetup.query],
    resolvers: [user.resolver, meetup.resolver],
});

module.exports = schema;

