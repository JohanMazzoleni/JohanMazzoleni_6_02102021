const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const models = {
    UsersModel: require("../models/Users"),
}

router.post("/signup", async function (req, res) {
    models.UsersModel.save()
        .then(function (user) {
            res.status(200);
            res.json({
                status: true,
            })
        })
        .catch(function (err) {
            res.status(400);
            res.json({
                status: false,
            })
        });
});

router.post("/login", async function (req, res) {
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

                res.status(200);
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
        .catch(function (err) {
            res.status(401);
            res.json({
                status: false,
            });
        })
});

module.exports = router;