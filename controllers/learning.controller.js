const { prisma } = require("./prisma.controller")

const getAllLearnings = async (req, res) => {
    const learning = await prisma.learning.findFirst({ 
        where: { 
            user_id: req.user_id
        } 
    });
    return res.status(200).json({ learning: learning });
}

const createNewLearning = async (req, res) => {
    try {
        const learning = await prisma.learning.create({ 
            data: { 
                user_id: req.user_id 
            } 
        });
        return res.status(201).json({ 
            message: "Successfully created new learning!", 
            learning: learning 
        });
    } catch (error) {
        return res.status(400).json({ error: "Chapter has already created!" });
    }
}

module.exports = {
    getAllLearnings,
    createNewLearning
}