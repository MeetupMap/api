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
        createGroup: async (_, {groupID, name, userID}) => {
            const user = await prisma.user.findUnique({
                where: {
                    id: userID
                }
            })

            const group = await prisma.group.create({
                data: {
                    id: groupID,
                    name: name,
                    users: [
                        { id: user.id, name: user.name, email: user.email }
                    ]
                }
            })

            const updateUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    groups: group
                }
            })

            console.log(user)

            return group
        },    
    }
}

module.exports = {
    resolver: Resolver
}