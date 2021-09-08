const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const Resolver = {
    Query: {
        meetup: async (_, {meetupID}) => {
            return prisma.meetup.findUnique({
                where: { id: meetupID },
                include: {
                    groups: {
                        include: {
                            users: true
                        }
                    }
                }
            });
        },
    },

    Mutation: {
        createMeetup: async (_, {meetupID, name, coordinates, groupID}) => {
            return prisma.meetup.create({
                data: {
                    id: meetupID,
                    name: name,
                    coordinates: coordinates,
                    groups: {
                        connect: {
                            id: groupID
                        }
                    }
                }
            });
        }
    }
    
};

module.exports = {
    resolver: Resolver
};