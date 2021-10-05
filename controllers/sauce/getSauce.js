const models = {
    Sauce: require("../../models/sauce"),
};

module.exports = function (req, res) {
    let id = req.params.id;

    models.Sauce.findOne({
        _id: id,
    }).then(function (sauce) {
        res.json(sauce);
    })
        .catch(function () {
            res.status(404);
            res.json({
                status: false,
            })
        });
};