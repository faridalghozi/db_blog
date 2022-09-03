const { Router } = require('express')
const m$blog = require('../modules/comment.modules')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const BlogController = Router()

/**
 * List User
 */
BlogController.get('/', async (req, res, next) => {
    const listComment = await m$blog.listComment()

    response.sendResponse(res, listComment)
})

/**
 * Detail User
 */
BlogController.get('/detailComment', async (req, res, next) => {
    // req.query
    // https://localhost:5001/api/comments/detailComment?id_comment=1
    const detailComment = await m$blog.detailComment(req.query.id_comment)

    response.sendResponse(res, detailComment)
})

/**
 * Add User
 * @param {number} id_user
 * @param {number} id_article
 * @param {string} content
 */
BlogController.post('/', userSession, async (req, res, next) => {
    // req.body req.params req.query
    const addComment = await m$blog.addComment(req.body)

    response.sendResponse(res, addComment)
})

/**
 * Edit User
 * @param {number} id_comment
 * @param {number} id_user
 * @param {number} id_article
 * @param {string} content
 */
 BlogController.put('/', userSession, async (req, res, next) => {
    // req.body req.params req.query
    const editComment = await m$blog.editComment(req.body)

    response.sendResponse(res, editComment)
})

/**
 * Delete User
 * @param {number} id_comment
 */
 BlogController.delete('/:id_comment', userSession, async (req, res, next) => {
    // req.body req.params req.query
    const delComment = await m$blog.deleteComment(req.params.id_comment)

    response.sendResponse(res, delComment)
})

module.exports = BlogController