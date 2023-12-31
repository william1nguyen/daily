const { prisma } = require("./prisma.controller")

const getAllFlashcards = async (req, res) => {
    const flashcards = await prisma.flashCard.findMany({
        where: {
            chapter: {
                subject: {
                    learning: { user_id: req.user_id }
                }
            }
        }
    });

    return res.status(200).json({ flashcards: flashcards });
}

const getFlashcardByFlashcardId = async (req, res) => {
    const { flashcard_id } = req.params;
    const flashcard = await prisma.flashCard.findFirst({
        where: {
            id: flashcard_id,
            chapter: {
                subject: {
                    learning: { user_id: req.user_id }
                }
            }
        }
    });
    return res.status(200).json({ flashcard: flashcard });
}

const getFlashcardsByChapterId = async (req, res) => {
    const { chapter_id } = req.query;
    const flashcards = await prisma.flashCard.findMany({
        where: {
            chapter: {
                id: chapter_id,
                subject: {
                    learning: { user_id: req.user_id }
                }
            }
        }
    });
    return res.status(200).json({ flashcards: flashcards });
}

const createNewFlashcard = async (req, res) => {
    const { chapter_id, front_content, back_content } = req.body;
    try {
        const flashcard = await prisma.flashCard.create({
            data: {
                chapter_id: chapter_id,
                front_content: front_content,
                back_content: back_content
            }
        });
        return res.status(201).json({
            message: "Created new flash card!",
            flashcard: flashcard
        });
    } catch (error) {
        return res.status(400).json({ error: "Invalid chapter" });
    }
}

const updateFlashcard = async (req, res) => {
    const { flashcard_id, front_content, back_content } = req.body;
    try {
        await prisma.flashCard.update({
            where: {
                id: flashcard_id,
                chapter: {
                    subject: { 
                        learning: { user_id: req.user_id }
                    }
                }
            },
            data: {
                front_content: front_content,
                back_content: back_content
            }
        });
        return res.status(200).json({ message: "Updated!" });
    } catch (error) {
        return res.status(400).json({ error: "Updated failed!" });
    }
}

const deleteFlashcard = async (req, res) => {
    const { flashcard_id } = req.body;
    try {
        await prisma.flashCard.delete({
            where: {
                id: flashcard_id,
                chapter: {
                    subject: { 
                        learning: { user_id: req.user_id }
                    }
                }
            },
        });

        return res.status(200).json({ message: "Deleted!" });
    } catch (error) {
        return res.status(400).json({ error: "Deleted failed!" });
    }
}

module.exports = {
    getAllFlashcards,
    getFlashcardByFlashcardId,
    getFlashcardsByChapterId,
    createNewFlashcard,
    updateFlashcard,
    deleteFlashcard
}