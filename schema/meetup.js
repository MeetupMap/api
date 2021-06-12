const gql = require('graphql-tag').gql;

const Query = gql`
    type Meetup {
        goodbye: String
        kind: Int
    }
`;

const Resolver = {
    Query: {
        meetup: () => {
            return {
                goodbye: "no",
                kind: 5
            }
        }
    }
};

module.exports = {
    query: Query,
    resolver: Resolver
};