const express = require("express")
const users = require('./MOCK_DATABASE.json')
const fs = require("fs")

const app = express()

const PORT = 8000


// Middleware | Plugin
app.use(express.urlencoded({ extended: false }))

// Custom MiddleWare
app.use((req, res, next) => {
    fs.appendFile('log.txt', `\n${Date.now()} -> IP: ${req.ip} ; ${req.method} : ${req.path}`, (err, data) => {
        next();
    })
})

app.use((req, res, next) => {
    console.log("Middleware 1"),
        next()
})

app.use((req, res, next) => {
    console.log("Middleware 2"),
        next()
})

// Routes

// Route for api
app.get("/api/users", (req, res) => {
    return res.json(users)
})
// Same route for html doc to build a hybrid server
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    return res.send(html);
})

// Dynamic Route to get specific user data (By id)
// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id)
//     const user = users.find((user) => user.id === id)
//     return res.json(user)
// })

app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)
        return res.json(user)
    })
    .put((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            users.push({ id: id, ...body });
            fs.writeFile('./MOCK_DATABASE.json', JSON.stringify(users), () => {
                return res.json({ status: 'update success', id: id });
            });
        } else {
            return res.status(404).json({ status: 'user not found' });
        }
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            fs.writeFile('./MOCK_DATABASE.json', JSON.stringify(users), () => {
                return res.json({ status: 'delete success', id: id });
            });
        } else {
            return res.status(404).json({ status: 'user not found' });
        }
    })

app
    .post("/api/users", (req, res) => {
        const body = req.body;
        // console.log(body)
        users.push({ id: users.length + 1, ...body })
        fs.writeFile('./MOCK_DATABASE.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: "success", id: users.length })
        })
    })
app.listen(PORT, () => console.log(`Server has started at ${PORT}.`))