const models = {
    Sauce: require("../../models/sauce"),
};

module.exports = function (req, res) {
    let id = req.params.id;
    models.Sauce.deleteOne({
        _id: id,
    }).then(function () {
        res.status(200);
        res.json({ status: true });
    })
        .catch(function () {
            res.status(404);
            res.json({
                status: false,
            })
        });
}