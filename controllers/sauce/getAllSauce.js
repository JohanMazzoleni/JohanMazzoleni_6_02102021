const models = {
    Sauce: require("../../models/sauce"),
};

module.exports = function (req, res) {
    models.Sauce.find()
        .then(function (sauceList) {
            res.status(200);
            res.json(sauceList);
        })
        .catch(function () {
            res.status(400);
            res.json({
                status: 0,
            })
        })
};