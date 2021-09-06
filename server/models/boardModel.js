const mongoose = require('mongoose');

const boardSchema = {
    title: String,
    content: Array
}

const Board = mongoose.model("boards", boardSchema)

module.exports = Board;