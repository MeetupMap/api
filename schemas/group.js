const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const Resolver = {
    Query: {
        group: (_, {groupID}) => {
            return prisma.group.findUnique({
                where: {
                    id: groupID
                }
            })
        },
    },

    Mutation: {
        createGroup: (_, {groupID, name}) => {
            console.log("Created new group!");
            return prisma.group.create({
                data: {
                    id: groupID,
                    name: name,
                }
            })
        },    
    }
}

module.exports = {
    resolver: Resolver
}