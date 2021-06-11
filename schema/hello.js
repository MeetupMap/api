const gql = require('graphql-tag').gql;

const Query = gql`
    type Greeting {
        greeting: String
        kind: Int
    }
`;

const Resolver = {
    Query: {
        hello: (_, {text, kindnessNum}) => {
            return {
                greeting: text,
                kind: kindnessNum
            }
        }
    }
};


module.exports = {
    query: Query,
    resolver: Resolver
};