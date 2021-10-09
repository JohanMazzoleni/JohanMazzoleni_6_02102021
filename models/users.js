const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

var schema = mongoose.Schema({
    email: {
        type: String,
        unique: 1,
        required: 1,
        validate: [validateEmail, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: 1,
    }
});

schema.pre("save", function (next) {
    var ctx = this;
    bcrypt.hash(ctx.password, 10, function (err, hash) {
        ctx.password = hash;
        next();
    });
});

schema.plugin(uniqueValidator);

module.exports = (mongoose.models.Users) ? mongoose.models.Users : mongoose.model("Users", schema);
