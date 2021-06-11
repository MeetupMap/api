const gql = require('graphql-tag').gql;

const Query = gql`
    type Greeting {
        greeting: String
        kind: Int
    }
`;

const Resolver = {
    Query: {
        hello: () => {
            return {
                greeting: "yes",
                kind: 4
            }
        }
    }
};


module.exports = {
    query: Query,
    resolver: Resolver
};