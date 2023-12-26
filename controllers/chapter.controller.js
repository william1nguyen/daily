const { prisma } = require("./prisma.controller")

const getAllChapters = async (req, res) => {
    const chapters = await prisma.chapter.findMany({
        where: {
            subject: {
                learning: { user_id: req.user_id }
            }
        },
    });
    return res.status(200).json({ chapters: chapters });
}

const getChaptersBySubjectId = async (req, res) => {
    const { subject_id } = req.params;
    const chapters = await prisma.chapter.findMany({
        where: {
            subject: {
                id: subject_id,
                learning: { user_id: req.user_id }
            }
        },
    });
    return res.status(200).json({ chapters: chapters });
}

const createNewChapter = async (req, res) => {
    const { subject_id, title } = req.body;
    try {
        const chapter = await prisma.chapter.create({
            data: {
                subject_id: subject_id,
                title: title
            },
        });
        return res.status(201).json({ 
            message: 'Created new chapter!',
            chapter: chapter 
        });
    } catch (error) {
        return res.status(400).json({
            error: "Invalid Subject"
        })
    }
}

const updateChapter = async (req, res) => {
    const { chapter_id, title } = req.body;
    try {
        await prisma.chapter.update({
            where: {
                id: chapter_id,
                subject: {
                    learning: { user_id: req.user_id }
                }
            },
            data: { title: title }
        });
        return res.status(200).json({ message: 'Updated!' });
    } catch (error) {
        return res.status(400).json({ error: "Updated failed!" });
    }
}

const deleteChapter = async (req, res) => {
    const { chapter_id } = req.body;
    try {
        await prisma.chapter.delete({
            where: {
                id: chapter_id,
                subject: { 
                    learning: { user_id: req.user_id }
                }
            },
        });
        return res.status(200).json({ message: "Deleted!" });
    } catch (error) {
        return res.status(400).json({ error: "Deleted failed!" });
    }
}

module.exports = {
    getAllChapters,
    getChaptersBySubjectId,
    createNewChapter,
    updateChapter,
    deleteChapter
};