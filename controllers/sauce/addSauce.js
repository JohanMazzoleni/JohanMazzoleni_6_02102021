const models = {
    Sauce: require("../../models/sauce"),
};

module.exports = function (req, res) {
    if (!req.file) {
        res.status(400);
        res.json({
            status: false,
        });
        return;
    };

    let {
        name,
        manufacturer,
        description,
        mainPepper,
        heat
    } = JSON.parse(req.body.sauce);

    let sauce = new models.Sauce({
        userId: res.locals.user.userId,
        name: name,
        manufacturer: manufacturer,
        description: description,
        mainPepper: mainPepper,
        imageUrl: "http://localhost:3000/uploads/" + req.file.filename,
        heat: heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });

    sauce.save().then(function () {
        res.status(200);
        res.json({
            status: true,
        });
    })
        .catch(function (err) {
            console.log(err);
            res.status(401);
            res.json({
                status: false,
            })
        })
};