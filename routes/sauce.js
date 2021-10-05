const express = require("express");
const router = express.Router();

const middleware = {
	verifyToken: require("../middleware/verifyToken"),
	multer: require("../middleware/multer"),
}

const controller = {
	getAllSauce: require("../controllers/sauce/getAllSauce"),
	getSauce: require("../controllers/sauce/getSauce"),
	addSauce: require("../controllers/sauce/addSauce"),
	editSauce: require("../controllers/sauce/editSauce"),
	deleteSauce: require("../controllers/sauce/deleteSauce"),
	likeSauce: require("../controllers/sauce/likeSauce"),
}

router.use(middleware.verifyToken);

router.get("/", controller.getAllSauce);

router.get("/:id", controller.getSauce);

router.post("/", middleware.multer, controller.addSauce);

router.put("/:id", middleware.multer, controller.editSauce);

router.delete("/:id", controller.deleteSauce);

router.post("/:id/like", controller.likeSauce);

module.exports = router;