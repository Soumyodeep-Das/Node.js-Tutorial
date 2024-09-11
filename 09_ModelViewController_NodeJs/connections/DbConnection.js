const mongoose = require("mongoose")

async function connectMongoDB() {
    mongoose.connect('mongodb://127.0.0.1:27017/mongodb-nodejs-tutorial')
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err))
}

module.exports = {
    connectMongoDB
}