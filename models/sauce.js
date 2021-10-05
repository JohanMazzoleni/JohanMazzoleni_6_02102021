const mongoose = require("mongoose");

var schema = mongoose.Schema({
    userId: {
        type: String,
        required: 1,
    },
    name: {
        type: String,
        required: 1,
    },
    manufacturer: {
        type: String,
        required: 1,
    },
    description: {
        type: String,
        required: 1,
    },
    mainPepper: {
        type: String,
        required: 1,
    },
    imageUrl: {
        type: String,
        required: 1,
    },
    heat: {
        type: Number,
        required: 1,
    },
    likes: {
        type: Number,
        required: 1,
    },
    dislikes: {
        type: Number,
        required: 1,
    },
    usersLiked: {
        type: Array,
        required: 1,
    },
    usersDisliked: {
        type: Array,
        required: 1,
    }
});

module.exports = (mongoose.models.Sauce) ? mongoose.models.Sauce : mongoose.model("Sauce", schema);
