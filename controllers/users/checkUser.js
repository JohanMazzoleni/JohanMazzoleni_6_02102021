const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const models = {
    UsersModel: require("../../models/Users"),
};

module.exports = function (req, res) {
    models.UsersModel.findOne({
        email: req.body.email,
    }).then(function (user) {
        bcrypt.compare(req.body.password, user.password).then(function (result) {
            if (result === true) {
                let token = jwt.sign({
                    userId: user._id
                }, process.env.JWT_SECRET,
                    {
                        expiresIn: "48h"
                    });

                res.json({
                    status: true,
                    userId: user._id,
                    token: token,
                });
            }
            else {
                res.status(401);
                res.json({
                    status: false,
                });
            }
        })
    })
        .catch(function () {
            res.status(404);
            res.json({
                status: false,
            });
        })
};