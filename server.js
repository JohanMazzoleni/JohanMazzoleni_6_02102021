const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

require("dotenv").config();

mongoose.connect(process.env.CREDENTIAL, function (err) {
    if (err) throw err;
    console.log("Successfully connected");
});

const auth = require("./routes/auth");

app.use("/api/auth/", auth);


app.listen(port, () => {
    console.log(`Start on port http://localhost:${port}`);
});