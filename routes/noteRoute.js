const express = require("express");
const router = express.Router();
const { createNote, createNoteGroup, allNotes, updateNote, deleteNote } = require('../controller/noteController');


router.post('/', createNote);
router.post('/group', createNoteGroup);
router.get('/', allNotes);
router.put('/', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;    