const fs = require("fs");
const path = require("path");

const models = {
    Sauce: require("../../models/sauce"),
};

module.exports = function (req, res) {
    let id = req.params.id;

    let data;

    if (req.body.sauce)
        data = JSON.parse(req.body.sauce);
    else
        data = req.body;

    let updateArray = {
        name: data.name,
        manufacturer: data.manufacturer,
        description: data.description,
        mainPepper: data.mainPepper,
        heat: data.heat,
    };

    if (req.file) {
        updateArray["imageUrl"] = "http://localhost:3000/uploads/" + req.file.filename;
    }

    models.Sauce.findOne({
        _id: id,
    }).then(function (sauceInfo) {
        if (sauceInfo) {
            if (req.file) {
                var splitImage = sauceInfo.imageUrl.split("/");
                var pathImage = path.join(__dirname, "../../uploads", splitImage[splitImage.length - 1])

                if (fs.existsSync(pathImage))
                    fs.unlinkSync(pathImage);
            };

            models.Sauce.updateOne({
                _id: id,
                userId: data.userId,
            },
                {
                    $set: updateArray
                }).then(function (data) {
                    if (data.modifiedCount === 1) {
                        res.json({
                            status: true
                        });
                    }
                    else {
                        res.status(403);
                        res.json({
                            status: false,
                        });
                    }

                })
                .catch(function () {
                    res.status(400);
                    res.json({
                        status: false,
                    })
                });
        }
        else {
            res.status(404);
            res.json({
                status: false,
            })
            return;
        }
    })
        .catch(function (err) {
            console.log(err);
            res.status(404);
            res.json({
                status: false,
            })
        });
};