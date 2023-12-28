const express = require('express');
const router = express.Router()
const { authorization } = require('../middlewares/authorization');
const {
    getAllLearnings,
    createNewLearning
} = require('../controllers/learning.controller');
const {
    getAllSubjects,
    getSubjectsInDetail,
    createNewSubject,
    updateSubject,
    deleteSubject
} = require('../controllers/subject.controller');
const {
    getAllChapters,
    getChaptersBySubjectId,
    createNewChapter,
    updateChapter,
    deleteChapter
} = require('../controllers/chapter.controller');

const {
    getAllFlashcards,
    getFlashcardByFlashcardId,
    getFlashcardsByChapterId,
    createNewFlashcard,
    updateFlashcard,
    deleteFlashcard
} = require('../controllers/flashcard.controller');
const { getContentTypes } = require('../controllers/contentType.controller');

// learning
router.get('/learnings', authorization, getAllLearnings);
router.post('/learnings', authorization, createNewLearning);

// subjects
router.get('/subjects', authorization, getAllSubjects);
router.get('/subjects/detail', authorization, getSubjectsInDetail);
router.post('/subjects', authorization, createNewSubject);
router.put('/subjects', authorization, updateSubject);
router.delete('/subjects', authorization, deleteSubject);

// chapters
router.get('/chapters', authorization, getAllChapters);
router.get('/chapters/:subject_id', authorization, getChaptersBySubjectId);
router.post('/chapters', authorization, createNewChapter);
router.put('/chapters', authorization, updateChapter);
router.delete('/chapters', authorization, deleteChapter);

// flashcards
router.get('/flashcards', authorization, getAllFlashcards);
router.get('/flashcards/:flashcard_id', authorization, getFlashcardByFlashcardId);
router.get('/flashcards/:chapter_id', authorization, getFlashcardsByChapterId);
router.post('/flashcards', authorization, createNewFlashcard);
router.put('/flashcards', authorization, updateFlashcard);
router.delete('/flashcards', authorization, deleteFlashcard);

// content_types
router.get('/content_types', authorization, getContentTypes);

module.exports = router;