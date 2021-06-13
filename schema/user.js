const gql = require('graphql-tag').gql;
let UserDB = require('../models/user.model');

const typeDefs = gql`
    type User {
        _id: String
        name: String
        email: String
        scheduledMeetups: [String] 
        friends: [String]
        pendingFriends: [String]
    }
`;

const Resolver = {
    Query: {
        user: (_, {userID}) => {
            return {
                _id: userID,
                name: "testName",
                email: "testemail@gmail.com",
                scheduledMeetups: ["meetup1", "meetup2", "meetup3"],
                friends: ["friend1", "friend2"," friend3"],
                pendingFriends: ["pendingFriend1", "pendingFriend2"]
            }
        },
    },

    Mutation: {
        createUser: (_, {userID, name, email}) => {
            return {
                _id: userID,
                name: name,
                email: email,
                scheduledMeetups: ["meetup1", "meetup2", "meetup3"],
                friends: ["friend1", "friend2"," friend3"],
                pendingFriends: ["pendingFriend1", "pendingFriend2"]
            }
        }
    }
};

module.exports = {
    typedefs: typeDefs,
    resolver: Resolver
};