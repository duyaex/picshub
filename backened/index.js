const connectToMongo = require("./database")
const express = require('express');
const path = require("path");

connectToMongo();

const app = express()
const port = 5000
app.use(express.json())

// Available Routes

app.use("/api/auth", require("./routes/auth"));

//Server production assests
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join("../build")))
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "build", "index.html")))
}
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})