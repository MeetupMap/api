const tools = require('graphql-tools');
const user = require('../schemas/user.js');
const meetup = require('../schemas/meetup.js');
const gql = require('graphql-tag').gql;

const Query = gql`
    type Mutation {
        createUser(userID: String!, name: String!, email: String!): User 
        createMeetup(meetupID: String!, name: String!, meetupHoster: String!, coordinates: [Float]!): Meetup
        addFriend(requester: String!, receiver: String!): Success
        acceptFriend(requester: String!, receiver: String!): Success
        removeFriend(requester: String!, target: String!) : Success # requester: person requesting to remove, target: person being removed 
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

