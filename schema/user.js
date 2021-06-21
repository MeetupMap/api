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
            };
        },

        addFriend: (_, {requester, receiver}) => {
            let successMessage = userDB.findById(receiver)
            .then(user => {
                let tempFriends = user.pendingFriends;
                if(tempFriends.includes(requester)) {
                    return "duplicate_error";
                }
                else {
                    tempFriends.push(requester);
                    user.pendingFriends = tempFriends;
                    user.save()
                        .then(() => console.log("sent friend request!"))
                        .catch(err => console.log("error: " + err));
                    return "success";
                }
            })
            .catch(err => {
                console.log("error: " + err);
                return "error";
            });
            
            return {
                message: successMessage
            };
        },

        acceptFriend: (_, {requester, receiver}) => {
            let successMessage = userDB.findById(receiver)
                .then(user => {
                    let tempFriendRequests = user.pendingFriends;
                    let tempFriends = user.friends;
                    const index = tempFriendRequests.indexOf(requester);
                    tempFriendRequests.splice(index, 1);
                    tempFriends.push(requester);
                    user.save()
                        .then(() => console.log("accepted friend request!"))
                        .catch(err => console.log("error: " + err));
                    return "success";
                })
                .catch(err => {
                    console.log("error: " + err);
                    return "error";
                })
            return {
                message: successMessage
            };
        }
    }
};

module.exports = {
    typedefs: typeDefs,
    resolver: Resolver
};