const { prisma } = require('../controllers/prisma.controller');

const getContentTypes = async (req, res) => {
    const contentTypes = await prisma.contentType.findMany();
    return res.status(200).json({ content_types: contentTypes });
}

module.exports = { getContentTypes };