// const http = require("http")
const express = require("express")

const PORT = 8000; 

const app = express();

app.get('/', (req, res) => {
    console.log(req.url)
    return res.send("Hello from Home Page");
})

app.get('/about', (req, res) => {
    return res.send("Hello from About Page\nWelcome " + req.query.name)
})

app.listen(PORT, () => console.log(`Server has started at ${PORT}`))
// const myServer = http.createServer(app)

// myServer.listen(8000, () => console.log("Server has Started.."))