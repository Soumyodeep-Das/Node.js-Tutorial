const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    // console.log(req);
    const log = `${Date.now()}: ${req.url} New Request Received\n`;
    fs.appendFile("log.txt", log, (err, data) => {
        switch (req.url) {
            case "/":
                res.end("Home Page");
                break;
            case "/about":
                res.end("About Page");
                break;
            default:
                res.end("404 not found");
        }
        // res.end("Hello From Server");
    })
});

myServer.listen(8000, () => {
    console.log("Server started in 8000 port")
})


