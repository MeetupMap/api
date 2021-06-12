const gql = require('graphql-tag').gql;

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
            return {
                _id: meetupID,
                name: "test Meetup",
                meetupHoster: "testHoster",
                coordinates: [-179.3213, 273.2342],
                peopleAttending: ["testAttendee1", "testAttendee2", "testAttendee3"]
            }
        }
    }
};

module.exports = {
    typedefs: typeDefs,
    resolver: Resolver
};