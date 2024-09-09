const express = require("express")
const users = require('./MOCK_DATABASE.json')

const app = express()

const PORT = 8000

// Routes

// route for api
app.get("/api/users", (req, res) => {
    res.json(users)
})
// same route for html doc to build a hybrid server
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
})

app.listen(PORT, () => console.log(`Server has started at ${PORT}.`))