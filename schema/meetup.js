const gql = require('graphql-tag').gql;
let meetupDB = require('../models/meetup.model');
let userDB = require('../models/user.model');


const typeDefs = gql`
    type Meetup {
        _id: String
        name: String
        meetupHoster: String
        coordinates: [Float]
        peopleAttending: [String]
    }
`;

const Resolver = {
    Query: {
        meetup: (_, {meetupID}) => {
            const queriedMeetup = meetupDB.findById(meetupID)
                .then(meetup => { return meetup })
                .catch(err => console.log("error: " + err));
            return queriedMeetup;
        }
    },


    Mutation: {
        createMeetup: (_, {meetupID, name,  meetupHoster, coordinates}) => {
            // saving meetup to meetup collection
            const newMeetup = new meetupDB({
                _id: meetupID,
                name: name,
                meetupHoster: meetupHoster,
                coordinates: coordinates,
                peopleAttending: ["testAttendee1", "testAttendee2", "testAttendee3"]
            })

            newMeetup.save()
                .then(() => console.log("created new meetup in database"))
                .catch(err => console.log("error: " + err));
            
            // saving meetup to user's list of hosted meetups
            userDB.findById(newMeetup.meetupHoster)
                .then(user => {
                    let tempMeetup = user.scheduledMeetups;
                    tempMeetup.push(newMeetup._id);
                    user.scheduledMeetups = tempMeetup;
                    user.save()
                        .then(() => console.log("added meetup to user"))
                        .catch(err => console.log("error: " + err));
                })
                .catch(err => console.log("error: " + err));

            return {
                _id: meetupID,
                name: name,
                meetupHoster: meetupHoster,
                coordinates: coordinates,
                peopleAttending: ["testAttendee1", "testAttendee2", "testAttendee3"]
            }
        }
    }
    
};

module.exports = {
    typedefs: typeDefs,
    resolver: Resolver
};