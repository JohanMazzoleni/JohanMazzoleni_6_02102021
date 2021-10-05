const express = require("express");
const router = express.Router();

const controller = {
	multer: require("../controllers/multer"),
}

const middleware = {
	verifyToken: require("../middleware/verifyToken"),
}

const models = {
	Sauce: require("../models/Sauce"),
}

router.use(middleware.verifyToken);

router.get("/", function (req, res) {
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
})

router.get("/:id", function (req, res) {
	let id = req.params.id;
	models.Sauce.findOne({
		_id: id,
	}).then(function (sauce) {
		res.status(200);
		res.json(sauce);
	})
		.catch(function () {
			res.status(404);
			res.json({
				status: false,
			})
		});
});

router.post("/", controller.multer, function (req, res) {

	if (!req.file) {
		res.status(400);
		res.json({
			status: false,
		});
		return;
	};

	let {
		userId,
		name,
		manufacturer,
		description,
		mainPepper,
		heat
	} = JSON.parse(req.body.sauce);

	let sauce = new models.Sauce({
		userId: userId,
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
});

router.put("/:id", controller.multer, function (req, res) {
	let id = req.params.id;

	let data;

	if (req.body.sauce)
		data = JSON.parse(req.body.sauce);
	else 
		data = req.body;

	console.log(data);

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
			console.log("debug 3")
			res.status(200);
			res.json({ status: true });
		})
		.catch(function () {
			console.log("debug 2")
			res.status(400);
			res.json({
				status: false,
			})
		});
});

router.delete("/:id", function (req, res) {
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
});

router.post("/:id/like", function (req, res) {
	let id = req.params.id;
	let like = req.body.like;
	let userId = req.body.userId;

	models.Sauce.findOne({
		_id: id,
	}).then(function (sauce) {
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
});

module.exports = router;