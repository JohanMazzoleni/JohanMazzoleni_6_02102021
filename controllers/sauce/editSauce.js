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

    if (req.file)
        updateArray["imageUrl"] = "http://localhost:3000/uploads/" + req.file.filename,

            console.log("debug");

    models.Sauce.updateOne({
        _id: id,
    },
        {
            $set: updateArray
        }).then(function () {
            res.json({
                status: true
            });
        })
        .catch(function () {
            res.status(400);
            res.json({
                status: false,
            })
        });
};