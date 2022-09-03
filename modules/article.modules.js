// Helper database yang dibuat
const mysql = require('../helpers/database')
// Validation input
const Joi = require('joi')

class _article{
    // List all article
    listArticle = async () => {
        try{
            const listArticle = await mysql.query(
                'SELECT * FROM t_article',
                []
            )
            return{
            status: true,
            data: listArticle
            }

        } catch (error) {
            console.error('listArticle article module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }
    
    // Detail Article
    detailArticle = async (id_article) => {
        try{
            const schema = Joi.number().required()
            const validation = schema.validate(id_article)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return{
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const detailArticle = await mysql.query(
                'SELECT id_article, id_user, title, description FROM t_article WHERE id_article = ?',
                [id_article]
            )

            if(detailArticle.length < 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Sorry article not found'
                }
            }

            return{
                status: true,
                data: detailArticle[0]
            }

        } catch (error){
            console.error('detailArticle article module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

    // Create Article
    addArticle = async (body) => {
        try {
            const schema = Joi.object({
                id_user: Joi.number().required(),
                title: Joi.string().required(),
                description: Joi.string().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)
                return{
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            
            const addArticle = await mysql.query(
                'INSERT INTO t_article (id_user, title, description) VALUES (?, ?, ?)',
                [body.id_user, body.title, body.description]
            )

            return{
                status: true,
                data: addArticle
            }

        } catch (error) {
            console.error('addArticle article module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

    // Update Article
    editArticle = async (body) => {
        try {
            const schema = Joi.object({
                id_article: Joi.number().required(),
                id_user: Joi.number().required(),
                title: Joi.string().required(),
                description: Joi.string().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)
                return{
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            
            const editArticle = await mysql.query(
                'UPDATE t_article SET title = ?, description = ? WHERE id_article = ?',
                [body.title, body.description, body.id_article]
            )

            return{
                status: true,
                data: editArticle
            }

        } catch (error) {
            console.error('editArticle article module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

    // Delete Article
    deleteArticle = async (id_article) => {
        try {
            const body = { id_article }
            const schema = Joi.object({
                id_article: Joi.number().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)
                return{
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            
            const delArticle = await mysql.query(
                'DELETE FROM t_article WHERE id_article = ?',
                [id_article]
            )

            return{
                status: true,
                data: delArticle
            }

        } catch (error) {
            console.error('deleteArticle article module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

}

module.exports = new _article()