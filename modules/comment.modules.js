// Helper database yang dibuat
const mysql = require('../helpers/database')
// Validation input
const Joi = require('joi')

class _comment{
    // List all comment
    listComment = async () => {
        try{
            const listComment = await mysql.query(
                'SELECT * FROM t_comment',
                []
            )
            return{
            status: true,
            data: listComment
            }

        } catch (error) {
            console.error('listComment comment module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }
    
    // Detail Comment
    detailComment = async (id_comment) => {
        try{
            const schema = Joi.number().required()
            const validation = schema.validate(id_comment)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return{
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const detailComment = await mysql.query(
                'SELECT id_comment, id_article, id_user, content FROM t_comment WHERE id_comment = ?',
                [id_comment]
            )

            if(detailComment.length < 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Sorry comment not found'
                }
            }

            return{
                status: true,
                data: detailComment[0]
            }

        } catch (error){
            console.error('detailComment comment module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

    // Create Comment
    addComment = async (body) => {
        try {
            const schema = Joi.object({
                id_article: Joi.number().required(),
                id_user: Joi.number().required(),
                content: Joi.string().required()
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
            
            const addComment = await mysql.query(
                'INSERT INTO t_comment (id_article, id_user, content) VALUES (?, ?, ?)',
                [body.id_article, body.id_user, body.content]
            )

            return{
                status: true,
                data: addComment
            }

        } catch (error) {
            console.error('addComment comment module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

    // Update Comment
    editComment = async (body) => {
        try {
            const schema = Joi.object({
                id_comment: Joi.number().required(),
                id_article: Joi.number().required(),
                id_user: Joi.number().required(),
                content: Joi.string().required(),
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
            
            const editComment = await mysql.query(
                'UPDATE t_comment SET content = ? WHERE id_comment = ?',
                [body.content, body.id_comment]
            )

            return{
                status: true,
                data: editComment
            }

        } catch (error) {
            console.error('editComment comment module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

    // Delete Comment
    deleteComment = async (id_comment) => {
        try {
            const body = { id_comment }
            const schema = Joi.object({
                id_comment: Joi.number().required()
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
            
            const delComment = await mysql.query(
                'DELETE FROM t_comment WHERE id_comment = ?',
                [id_comment]
            )

            return{
                status: true,
                data: delComment
            }

        } catch (error) {
            console.error('deleteComment comment module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

}

module.exports = new _comment()