const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

//@description     Get or Search all notes
//@route           GET /api/note?search=
//@access          Public
const allNotes = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            group: { $regex: req.query.search, $options: "i" },
        }
        : {};
    const notes = await Note.find(keyword);

    res.send(notes);
});

//@description     Register new note
//@route           POST /api/note/
//@access          Public
const createNote = asyncHandler(async (req, res) => {

    const { group, description, color } = req.body;

    if (!group || !description) {
        res.status(400);
        throw new Error("Please Enter all sender and title of your note");
    }

    const note = await Note.create({
        group,
        description,
        color,
    });
    // console.log(note);

    if (note) {
        res.status(201).json({
            _id: note._id,
            group: note.group,
            description: note.description,
            color: note.color,
            createdAt: note.createdAt
        });
    } else {
        res.status(400);
        throw new Error("Note Couldn't Be Created");
    }
});

//@description     Update existing note
//@route           PUT /api/note/
//@access          Public
const updateNote = asyncHandler(async (req, res) => {
    const { noteId, group, description, color } = req.body;

    console.log("here");

    const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        {
            group: group,
            description: description,
            color: color
        },
        { new: true }
    );
    // console.log("here2 ", updateNote);

    if (!updatedNote) {
        res.status(404);
        throw new Error("Note Couldn't Be Updated");
    } else {
        res.json(updatedNote);
    }
});

//@description     Delete existing note
//@route           DELETE /api/note/
//@access          Public
const deleteNote = asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
        res.status(404);
        throw new Error("Note Couldn't Be Deleted");
    } else {
        res.json(deletedNote);
    }
});

module.exports = { allNotes, createNote, updateNote, deleteNote };
