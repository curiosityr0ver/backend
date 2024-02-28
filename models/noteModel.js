const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
    {
        group: { type: String, trim: true },
        description: { type: String, trim: true },
        color: { type: String, trim: true }
    },
    { timestamps: true }
);
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
