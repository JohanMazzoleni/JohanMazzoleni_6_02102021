const jwt = require("jsonwebtoken");
const models = {
    UsersModel: require("../models/Users"),
}

module.exports = function (req, res, next) {
    try {
        let bearer = req.headers.authorization.split(" ")[1];
        let decodeToken = jwt.verify(bearer, process.env.JWT_SECRET);

        models.UsersModel.findOne({
            _id: decodeToken.userId,
        }).then(function (user) {
            if (user === null) {
                res.status(401);
                res.json({
                    status: false,
                })
            }
            else {
                next();
            }

        })
            .catch(function () {
                res.status(401);
                res.json({
                    status: false,
                })
            })
    }
    catch (err) {
        res.status(401);
        res.json({
            status: false,
        })
    }
}