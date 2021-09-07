const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const Resolver = {
    Query: {
        user: async (_, {userID}) => {
            const user = await prisma.user.findUnique({
                where: { id: userID }
            })
            return user;
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

    }
};

module.exports = {
    resolver: Resolver
};