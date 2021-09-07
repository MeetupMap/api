const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient();
const Resolver = {
    Query: {
        group: (_, {groupID}) => {
            return prisma.group.findUnique({
                where: { id: groupID }
            })
        },
    },

    Mutation: {
        createGroup: async (_, {groupID, name, userID}) => {

            // Create group
            await prisma.group.create({
                data: {
                    id: groupID,
                    name: name
                }
            });

            // Grab the list of users from the new group to update
            const group = await prisma.group.findUnique({
                where: { id: groupID },
                include: { Users: true }
            });

            // Update group with creator of group
            await prisma.group.update({
                where: { id: groupID },
                include: { Users: true },
                data: {
                    Users: {
                        connect: {
                            id: userID
                        }
                    }
                }
            });
            
            // Update list of groups for user            
            await prisma.user.update({
                where: { id: userID },
                data: {
                    groups: {
                        connect: {
                            id: groupID
                        }
                    }
                }
            })

            return group
        },    
    }
}

module.exports = {
    resolver: Resolver
}