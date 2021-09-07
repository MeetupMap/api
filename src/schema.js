const tools = require('graphql-tools');
const gql = require('graphql-tag').gql;

const user = require('../schemas/user');
const meetup = require('../schemas/meetup');
const group = require('../schemas/group');

const typeDefs = gql`
    type Mutation {
        createUser(userID: String!, name: String!, email: String!): User 
        createMeetup(meetupID: String!, name: String!, coordinates: [Float]!): Meetup
        createGroup(groupID: String!, name: String!, userID: String!): Group
        addUserToGroup(userID: String!, groupID: String!): Group
        removeUserFromGroup(userID: String!, groupID: String!): Group
    }

    type Query {
        user(userID: String!): User
        meetup(meetupID: String!): Meetup
        group(groupID: String!): Group
    }

    type User {
        id: String
        name: String
        email: String
        groups: [Group]
        meetups: [Meetup]
    }

    type Meetup {
        id: String
        name: String
        coordinates: [Float]
        users: [User]
        groups: [Meetup]
    }

    type Group {
        id: String
        name: String
        users: [User]
        meetups: [Meetup]
    }

`;

const schema = tools.makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: [user.resolver, meetup.resolver, group.resolver],
});

module.exports = schema;

