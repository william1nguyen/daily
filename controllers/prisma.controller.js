const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (req) => {
    const { username, email, hashedPassword } = req;
    const user = await prisma.user.create({
        data: {
            username: username,
            email: email,
            hash_password: hashedPassword,
        },
    });
    return user;
}

module.exports = { 
    prisma,
    createUser
};