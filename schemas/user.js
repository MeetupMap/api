const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const Resolver = {
    Query: {
        user: async (_, {userID}) => {
            return prisma.user.findUnique({
                where: { id: userID },
                include: {
                    groups: {
                        include: {
                            meetups: true
                        }
                    }
                }
            });
        },
    },

    Mutation: {
        createUser: async (_, {userID, name, email}) => {
            console.log("Created new user!");
            return prisma.user.create({
                data: {
                    id: userID,
                    name: name,
                    email: email
                }
            });
        },
        deleteUser: async(_, {userID}) => {
            return prisma.user.delete({
                where: { id: userID }
            });
        }

    }
};

module.exports = {
    resolver: Resolver
};