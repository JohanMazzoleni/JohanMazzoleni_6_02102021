const express = require("express");
const router = express.Router();

const middleware = {
    verifyToken: require("../middleware/verifyToken"),
}

router.use(middleware.verifyToken);

router.get("/", function (req, res) {
    console.log("good");
    res.json({
        status: 1
    })
})

module.exports = router;