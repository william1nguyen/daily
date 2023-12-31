const { prisma } = require('../controllers/prisma.controller');

const getAllSubjects = async (req, res) => {
    const subjects = await prisma.subject.findMany({
        where: {
            learning: { user_id: req.user_id }
        }
    });
    return res.status(200).json({ subjects: subjects });
}

const getSubjectsInDetail = async (req, res) => {
    const subjects = await prisma.subject.findMany({
        where: {
            learning: { user_id: req.user_id }
        },
        include: { chapters: true }
    });
    return res.status(200).json({ subjects: subjects });
}

const createNewSubject = async (req, res) => {
    const { learning_id, title } = req.body;
    try {
        const subject = await prisma.subject.create({
            data: {
                learning_id: learning_id,
                title: title
            }
        });
        return res.status(201).json({
            message: "Created new subject!",
            subject: subject
        });
    } catch (error) {
        return res.status(404).json({ error: "Learning is not found!" })
    }
}

const updateSubject = async (req, res) => {
    const { subject_id, title } = req.body;
    try {
        await prisma.subject.update({
            where: {
                id: subject_id,
                learning: { user_id: req.user_id }
            },
            data: { title: title }
        });
        return res.status(200).json({ message: "Updated!" });
    } catch (error) {
        return res.status(400).json({ error: "Updated failed" });
    }
}

const deleteSubject = async (req, res) => {
    const { subject_id } = req.body;
    try {
        await prisma.subject.delete({
            where: {
                id: subject_id,
                learning: { user_id: req.user_id }
            }
        });
        return res.status(200).json({ message: "Deleted!" });
    } catch (error) {
        return res.status(400).json({ error: "Deleted failed" });
    }
}

module.exports = {
    getAllSubjects,
    getSubjectsInDetail,
    createNewSubject,
    updateSubject,
    deleteSubject
};