const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const routes = {
    auth: require("./routes/auth"),
    sauce: require("./routes/sauce"),
};

mongoose.connect(process.env.CREDENTIAL, async function (err) {
    if (err) throw err;
    console.log("Successfully connected");
});

app.use("/uploads", express.static("uploads"));
app.use("/api/auth/", routes.auth);
app.use("/api/sauces/", routes.sauce);

app.listen(port, () => {
    console.log(`Start on port http://localhost:${port}`);
});