const { PrismaClient } = require('@prisma/client')

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
            console.log("Created new user!");
            return prisma.user.create({
                data: {
                    id: userID,
                    name: name,
                    email: email,
                    groups: {
                        create: [
                            {
                                id: "g2",
                                name: "g2",
                                meetups: {
                                    create: [
                                        {
                                            id: "m2",
                                            name: "m2",
                                            coordinates: [0.2, 0.2]
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            })
        },
    }
};

module.exports = {
    resolver: Resolver
};