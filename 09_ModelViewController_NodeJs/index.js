const express = require("express")
const { connectMongoDB } = require("./connections/DbConnection")
const router = require("./routes/userRoutes")

connectMongoDB()

const app = express()
PORT = 8000

app.use(express.urlencoded({extended: false}))

app.use("/api/users", router)

app.listen(PORT, () => console.log(`Server has started at ${PORT}`))