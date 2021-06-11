import { merge } from 'lodash';

import { makeExecutableSchema } from 'graphql-tools';
import {resolvers as helloResolve } from './schema/hello';
import { resolvers as byeResolve } from './schema/bye';

const Query = `
    type Query {
        hello: String
        bye: String
    }
`;

makeExecutableSchema({
    typeDefs: [Query],
    resolvers: merge(helloResolve, byeResolve),
});

