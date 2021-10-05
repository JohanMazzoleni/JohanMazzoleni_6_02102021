const mongoose = require("mongoose");

var schema = mongoose.Schema({
    userId: {
        type: String,
    },
    name: {
        type: String
    },
    manufacturer: {
        type: String,
    },
    description: {
        type: String,
    },
    mainPepper: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    heat: {
        type: Number,
    },
    likes: {
        type: Number,
    },
    dislikes: {
        type: Number,
    },
    usersLiked: {
        type: Array,
    },
    usersDisliked: {
        type: Array,
    }
});

module.exports = (mongoose.models.Sauce) ? mongoose.models.Sauce : mongoose.model("Sauce", schema);