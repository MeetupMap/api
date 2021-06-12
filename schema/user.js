const gql = require('graphql-tag').gql;
const GraphQLList = require('graphql').GraphQLList;
const Query = gql`
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
        }
    }
};

module.exports = {
    query: Query,
    resolver: Resolver
};