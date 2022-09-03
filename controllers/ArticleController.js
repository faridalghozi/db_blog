const { Router } = require('express')
const m$blog = require('../modules/article.modules')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const BlogController = Router()

/**
 * List Article
 */
BlogController.get('/', async (req, res, next) => {
    const listArticle = await m$blog.listArticle()

    response.sendResponse(res, listArticle)
})

/**
 * Detail Article
 */
BlogController.get('/detailArticle', async (req, res, next) => {
    // req.query
    // https://localhost:5001/api/articles/detailArticle?id_article=1
    const detailArticle = await m$blog.detailArticle(req.query.id_article)

    response.sendResponse(res, detailArticle)
})

/**
 * Add Article
 * @param {string} title
 * @param {string} description
 */
BlogController.post('/', userSession, async (req, res, next) => {
    // req.body req.params req.query
    const addArticle = await m$blog.addArticle(req.body)

    response.sendResponse(res, addArticle)
})

/**
 * Edit Article
 * @param {number} id_article
 * @param {number} id_user
 * @param {string} title
 * @param {string} description
 */
 BlogController.put('/', userSession, async (req, res, next) => {
    // req.body req.params req.query
    const editArticle = await m$blog.editArticle(req.body)

    response.sendResponse(res, editArticle)
})

/**
 * Delete Article
 * @param {number} id_user
 */
 BlogController.delete('/:id_article', userSession, async (req, res, next) => {
    // req.body req.params req.query
    const delArticle = await m$blog.deleteArticle(req.params.id_article)

    response.sendResponse(res, delArticle)
})

module.exports = BlogController