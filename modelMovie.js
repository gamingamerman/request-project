const { Int32 } = require("bson")
const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    actors: {
        type: Array,
        required: true
    },
    ranking: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model("movie", movieSchema)