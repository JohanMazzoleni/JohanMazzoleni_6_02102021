const fs = require("fs");
const path = require("path");

const models = {
    Sauce: require("../../models/sauce"),
};

module.exports = function (req, res) {
    let id = req.params.id;
    models.Sauce.findOne({
        _id: id,
    }).then(function (sauceInfo) {
        if (sauceInfo) {
            var splitImage = sauceInfo.imageUrl.split("/");
            var pathImage = path.join(__dirname, "../../uploads", splitImage[splitImage.length - 1])

            if (fs.existsSync(pathImage))
                fs.unlinkSync(pathImage);

            models.Sauce.deleteOne({
                _id: id,
            }).then(function () {
                res.status(200);
                res.json({ status: true });
            })
                .catch(function () {
                    res.status(400);
                    res.json({ status: true });
                })
        }
        else {
            res.status(404);
            res.json({
                status: false,
            })
        }
    }).catch(function () {
        res.status(404);
        res.json({
            status: false,
        })
    });
}