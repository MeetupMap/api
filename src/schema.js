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
    }

    type Meetup {
        id: String
        name: String
        coordinates: [Float]
        users: [User]
        groups: [GroupOnMeetup]
    }

    type Group {
        id: String
        name: String
        Users: [User]
        meetups: [GroupOnMeetup]
    }

    type GroupOnMeetup {
        Group: Group
        GroupId: String
        Meetup: Meetup 
        MeetupId: String
    }
`;

const schema = tools.makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: [user.resolver, meetup.resolver, group.resolver],
});

module.exports = schema;

