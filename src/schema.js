const tools = require('graphql-tools');
const user = require('../schemas/user');
const meetup = require('../schemas/meetup');
const gql = require('graphql-tag').gql;

const typeDefs = gql`

    type Mutation {
        createUser(userID: String!, name: String!, email: String!): User 
        createMeetup(meetupID: String!, name: String!, coordinates: [Float]!): Meetup
    }

    type Query {
        user(userID: String!): User
        meetup(meetupID: String!): Meetup
    }

    type User {
        id: String
        name: String
        email: String
        meetups: [Meetup] 
        groups: [String]
    }

    type Meetup {
        id: String
        name: String
        coordinates: [Float]
        users: [User]
        groups: [String]
    }
`;

const schema = tools.makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: [user.resolver, meetup.resolver],
});

module.exports = schema;

