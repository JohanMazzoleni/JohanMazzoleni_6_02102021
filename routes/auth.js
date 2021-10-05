const express = require("express");
const router = express.Router();

const controllers = {
    addUser: require("../controllers/users/addUser"),
    checkUser: require("../controllers/users/checkUser"),
};

router.post("/signup", controllers.addUser);
router.post("/login", controllers.checkUser);

module.exports = router;