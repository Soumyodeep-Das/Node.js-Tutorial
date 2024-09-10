const express = require("express")
// const users = require('./MOCK_DATABASE.json')
const fs = require("fs")
const mongoose = require("mongoose")

const app = express()

const PORT = 8000

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/mongodb-nodejs-tutorial')
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
}, {timestamps: true});

// Model
const User = mongoose.model("user", userSchema)


// Middleware | Plugin
app.use(express.urlencoded({ extended: false }))

// REST API Routes

// Route for api
app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
})
// Same route for html doc to build a hybrid server
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({})
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    </ul>
    `;
    return res.send(html);
})

app
    .route("/api/users/:id")
    .get(async (req, res) => {
        // const id = Number(req.params.id)
        // const user = users.find((user) => user.id === id)
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({error: "User not found"})
        return res.status(200).json(user)
    })
    .put(async (req, res) => {
        // const id = Number(req.params.id);
        // const body = req.body;
        // const index = users.findIndex((user) => user.id === id);
        // if (index !== -1) {
        //     users.splice(index, 1);
        //     users.push({ id: id, ...body });
        //     fs.writeFile('./MOCK_DATABASE.json', JSON.stringify(users), () => {
        //         return res.json({ status: 'update success', id: id });
        //     });
        // } else {
        //     return res.status(404).json({ status: 'user not found' });
        // }
        const user = await User.findByIdAndUpdate(req.params.id)
        return res.json({msg: "Success"})
    })
    .delete(async (req, res) => {
        // const id = Number(req.params.id);
        // const index = users.findIndex((user) => user.id === id);
        // if (index !== -1) {
        //     users.splice(index, 1);
        //     fs.writeFile('./MOCK_DATABASE.json', JSON.stringify(users), () => {
        //         return res.json({ status: 'delete success', id: id });
        //     });
        // } else {
        //     return res.status(404).json({ status: 'user not found' });
        // }
        const user = await User.findByIdAndDelete(req.params.id)
        return res.json({msg: "Deleted Successfully"})
    })

app
    .post("/api/users", async(req, res) => {
        const body = req.body;
        if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            return res.status(400).json({ msg: "All fields are mandatory" })
        }
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title,
        });
        // console.log(result)
        return res.status(201).json({msg: "Success"})
    })
app.listen(PORT, () => console.log(`Server has started at ${PORT}.`))