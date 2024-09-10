const express = require("express")
const users = require('./MOCK_DATABASE.json')
const fs = require("fs")

const app = express()

const PORT = 8000


// Middleware | Plugin
app.use(express.urlencoded({ extended: false }))

// REST API Routes

// Route for api
app.get("/api/users", (req, res) => {
    // res.setHeader('X-myName', 'SDas') // Custom Header [Include 'X-' to tell it is a custom header]
    // console.log(req.headers) // Header info coming from client
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

app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)
        return res.status(200).json(user)
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
        if (!body){
            return res.status(400).json({msg: "All fields are mandatory"})
        }
        users.push({ id: users.length + 1, ...body })
        fs.writeFile('./MOCK_DATABASE.json', JSON.stringify(users), (err, data) => {
            return res.status(201).json({ status: "success", id: users.length })
        })
    })
app.listen(PORT, () => console.log(`Server has started at ${PORT}.`))