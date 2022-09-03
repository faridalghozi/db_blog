const { Router } = require('express')
const m$blog = require('../modules/user.modules')
const response = require('../helpers/response')

const BlogController = Router()

/**
 * List User
 */
BlogController.get('/', async (req, res, next) => {
    const listUser = await m$blog.listUser()

    response.sendResponse(res, listUser)
})

/**
 * Detail User
 */
BlogController.get('/detailUser', async (req, res, next) => {
    // req.query
    // https://localhost:5001/api/users/detailUser?id_user=1
    const detailUser = await m$blog.detailUser(req.query.id_user)

    response.sendResponse(res, detailUser)
})

/**
 * Add User
 * @param {string} username
 * @param {string} password
 */
BlogController.post('/', async (req, res, next) => {
    // req.body req.params req.query
    const addUser = await m$blog.addUser(req.body)

    response.sendResponse(res, addUser)
})

/**
 * Edit User
 * @param {number} id_user
 * @param {string} username
 * @param {string} password
 */
 BlogController.put('/', async (req, res, next) => {
    // req.body req.params req.query
    const editUser = await m$blog.editUser(req.body)

    response.sendResponse(res, editUser)
})

/**
 * Delete User
 * @param {number} id_user
 */
 BlogController.delete('/:id_user', async (req, res, next) => {
    // req.body req.params req.query
    const delUser = await m$blog.deleteUser(req.params.id_user)

    response.sendResponse(res, delUser)
})

module.exports = BlogController