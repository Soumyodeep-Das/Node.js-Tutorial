const http = require("http");
const fs = require("fs");
const url = require("url")

const myServer = http.createServer((req, res) => {
    // console.log(req);
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Request Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl)
    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                res.end("Home Page");
                break;
            case "/about":
                const user_query = myUrl.query.q;
                res.end(`About Page ${user_query}`);
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


