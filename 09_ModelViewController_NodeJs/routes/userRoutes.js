const express = require("express")
const { handleGetAllUsers, handleCreateNewUsers, handleGetUsersById, handleUpdateUsersById, handleDeleteUsersById } = require("../controllers/UserControllers")

const router = express.Router()

router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUsers)

router
    .route("/:id")
    .get(handleGetUsersById)
    .put(handleUpdateUsersById)
    .delete(handleDeleteUsersById)

module.exports = router