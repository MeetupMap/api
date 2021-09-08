const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();
const Resolver = {
    Query: {
        group: (_, {groupID}) => {
            return prisma.group.findUnique({
                where: { id: groupID },
                include: { users: true, meetups: true }
            });
        },
    },

    Mutation: {
        createGroup: async (_, {groupID, name, userID}) => {
            return prisma.group.create({
                data: {
                    id: groupID,
                    name: name,
                    users: {
                        connect: {
                            id: userID
                        }
                    }
                }
            });
        },    
        addUserToGroup: async(_, {groupID, userID}) => {
            const group = await prisma.group.update({
                where: { id: groupID },
                data: {
                    users: {
                        connect: {
                            id: userID
                        }
                    }
                }
            });

            await prisma.user.update({
                where: { id: userID },
                data: {
                    groups: {
                        connect: {
                            id: groupID
                        }
                    }
                }
            });

            return group;
        },
        removeUserFromGroup: async(_, {groupID, userID}) => {
            return prisma.group.update({
                where: { id: groupID },
                data: {
                    users: {
                        disconnect: {
                            id: userID
                        }
                    }
                }
            });

        },
        deleteGroup: async(_, {groupID}) => {
            return prisma.group.delete({
                where: { id: groupID }
            });
        },
        

    }
}

module.exports = {
    resolver: Resolver
}