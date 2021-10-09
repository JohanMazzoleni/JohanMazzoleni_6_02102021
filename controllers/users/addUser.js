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
        .catch(function () {
            res.status(409); // 409	Conflict La requête ne peut être traitée en l’état actuel.
            res.json({
                status: false,
            })
        });
};