const tools = require('graphql-tools');
const user = require('../schema/user.js');
const meetup = require('../schema/meetup.js');
const gql = require('graphql-tag').gql;

const Query = gql`
    type Mutation {
        createUser(userID: String!, name: String!, email: String!): User 
        createMeetup(meetupID: String!, name: String!, meetupHoster: String!, coordinates: [Float]!): Meetup
        addFriend(requester: String!, receiver: String!): Success
        acceptFriend(requester: String!, receiver: String!): Success
    }

    type Query {
        user(userID: String!): User
        meetup(meetupID: String!): Meetup
    }
`;  

const typeDefs = gql`
    type Success {
        message: String
    }
`;

const schema = tools.makeExecutableSchema({
    typeDefs: [Query, typeDefs, user.typedefs, meetup.typedefs],
    resolvers: [user.resolver, meetup.resolver],
});

module.exports = schema;

