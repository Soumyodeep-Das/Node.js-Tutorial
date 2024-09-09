const express = require("express")
const users = require('./MOCK_DATABASE.json')

const app = express()

const PORT = 8000

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
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
})

app.listen(PORT, () => console.log(`Server has started at ${PORT}.`))