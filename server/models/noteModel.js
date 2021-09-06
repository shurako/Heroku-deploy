const mongoose = require('mongoose');

const noteSchema = {
    title: String,
    
}

const Note = mongoose.model("notes", noteSchema)

module.exports = Note;