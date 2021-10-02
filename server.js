const express = require("express");
const app = express();
const port = 3000;

const auth = require("./routes/auth");

app.use("/api/auth/", auth);


app.listen(port, () => {
    console.log(`Start on port http://localhost:${port}`);
});