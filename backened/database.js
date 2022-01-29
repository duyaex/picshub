const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/winorbay?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {

        console.log("Connection to mongo has done")
    })
}

module.exports = connectToMongo;