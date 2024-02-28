const express = require("express");
const router = express.Router();
const { createNote, allNotes, updateNote, deleteNote } = require('../controller/noteController');


router.post('/', createNote);
router.get('/', allNotes);
router.put('/', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;    