const gql = require('graphql-tag').gql;
let userDB = require('../models/user.model');

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
            const queriedUser = userDB.findById(userID)
                .then(user => { return user })
                .catch(err => console.log("error: " + err));
            return queriedUser;
        },
    },

    Mutation: {
        createUser: (_, {userID, name, email}) => {
            const newUser = new userDB({
                _id: userID,
                name: name,
                email: email,
                scheduledMeetup: [],
                friends: [],
                pendingFriends: []
            });

            newUser.save()
                .then(() => console.log("created new user"))
                .catch(err => console.log("error: " + err));
            
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