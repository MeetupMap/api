const gql = require('graphql-tag').gql;
const { PrismaClient } = require('@prisma/client')

let userDB = require('../models/user.model');
const Meetup = require('./meetup.js')

const prisma = new PrismaClient();


const Resolver = {
    Query: {
        user: (_, {userID}) => {
            return prisma.user.findUnique({
                where: {
                    id: userID
                }
            })
        },
    },

    Mutation: {
        createUser: (_, {userID, name, email}) => {
            console.log("Created new user!")
            return prisma.user.create({
                data: {
                    id: userID,
                    name: name,
                    email: email
                }
            })
        
        },
    }
};

module.exports = {
    resolver: Resolver
};