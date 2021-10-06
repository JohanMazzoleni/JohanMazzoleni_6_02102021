const models = {
    Sauce: require("../../models/sauce"),
};

module.exports = function (req, res) {
    let id = req.params.id;
    let like = req.body.like;
    let userId = req.body.userId;

    models.Sauce.findOne({
        _id: id,
    }).then(function (sauce) {


        // Vérifie si l'utilisateur a déjà like la sauce.
        if (like === -1 || like === 1) {
            if (sauce.usersLiked.includes(userId) || sauce.usersDisliked.includes(userId))
            {
                res.status(401);
                res.json({
                    status: false,
                })
                return;
            }
        }

        if (like === 1) {
            models.Sauce
                .updateOne({
                    _id: id,
                },
                    {
                        $push: {
                            usersLiked: userId,
                        },
                        $inc: {
                            likes: 1
                        }
                    }).then(function () {
                        res.status(200);
                        res.json({ status: true })
                    })
        }

        else if (like === -1) {
            models.Sauce
                .updateOne({
                    _id: id,
                },
                    {
                        $push: {
                            usersDisliked: userId,
                        },
                        $inc: {
                            dislikes: 1
                        }
                    }).then(function () {
                        res.status(200);
                        res.json({ status: true })
                    })
        }
        else {
            let incArray = { dislikes: -1 };

            if (sauce.usersLiked.includes(userId)) {
                incArray = {
                    likes: -1,
                }
            };

            models.Sauce.updateOne({
                _id: id,
            },
                {
                    $pull: {
                        usersLiked: userId,
                        usersDisliked: userId,
                    },
                    $inc: incArray,
                }).then(function () {
                    res.status(200);
                    res.json({ status: true })
                })
        }

    })
        .catch(function (err) {
            console.log(err);
            res.status(404);
            res.json({
                status: false,
            })
        });
}