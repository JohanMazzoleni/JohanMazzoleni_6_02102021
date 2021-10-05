const models = {
    UsersModel: require("../../models/Users"),
};

module.exports = function (req, res) {
    let user = new models.UsersModel(req.body);
    user.save().then(function (user) {
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
};