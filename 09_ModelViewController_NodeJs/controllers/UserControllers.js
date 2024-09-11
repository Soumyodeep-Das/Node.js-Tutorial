const { User } = require("../models/User")

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
}

async function handleGetUsersById(req, res) {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "User not found" })
    return res.status(200).json(user)
}

async function handleUpdateUsersById(req, res) {
    const body = req.body
    if (!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All fields are mandatory" })
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender, 
        jobTitle: body.job_title,
    })
    return res.json({ msg: `User: ${user._id} Updated` })
}

async function handleDeleteUsersById(req, res) {
    const user = await User.findByIdAndDelete(req.params.id)
    return res.json({ msg: `User: ${user._id} Deleted` })
}

async function handleCreateNewUsers(req, res) {
    const body = req.body
    if (!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All fields are mandatory" })
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })
    return res.status(201).json({ msg: `User created successfully` })
}

module.exports = {
    handleGetAllUsers,
    handleGetUsersById,
    handleUpdateUsersById,
    handleDeleteUsersById,
    handleCreateNewUsers
}