// Helper database yang dibuat
const mysql = require('../helpers/database')
// Validation input
const Joi = require('joi')

const bcrypt = require('bcrypt')

class _user{
    // List all user
    listUser = async () => {
        try{
            const listUser = await mysql.query(
                'SELECT * FROM t_user',
                []
            )
            return{
            status: true,
            data: listUser
            }

        } catch (error) {
            console.error('listUser user module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }
    
    // Detail User
    detailUser = async (id_user) => {
        try{
            const schema = Joi.number().required()
            const validation = schema.validate(id_user)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return{
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const detailUser = await mysql.query(
                'SELECT id_user, username, password FROM t_user WHERE id_user = ?',
                [id_user]
            )

            if(detailUser.length < 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Sorry user not found'
                }
            }

            return{
                status: true,
                data: detailUser[0]
            }

        } catch (error){
            console.error('detailUser user module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

    // Create User
    addUser = async (body) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string()
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

            body.password = bcrypt.hashSync(body.password, 10)
            
            const addUser = await mysql.query(
                'INSERT INTO t_user (username, password) VALUES (?, ?)',
                [body.username, body.password]
            )

            return{
                status: true,
                data: addUser
            }

        } catch (error) {
            console.error('addUser user module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

    // Update User
    editUser = async (body) => {
        try {
            const schema = Joi.object({
                id_user: Joi.number().required(),
                username: Joi.string().required(),
                password: Joi.string().required()
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
            
            body.password = bcrypt.hashSync(body.password, 10)

            const editUser = await mysql.query(
                'UPDATE t_user SET username = ?, password = ? WHERE id_user = ?',
                [body.username, body.password, body.id_user]
            )

            return{
                status: true,
                data: editUser
            }

        } catch (error) {
            console.error('editUser user module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

    // Delete User
    deleteUser = async (id_user) => {
        try {
            const body = { id_user }
            const schema = Joi.object({
                id_user: Joi.number().required()
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
            
            const delUser = await mysql.query(
                'DELETE FROM t_user WHERE id_user = ?',
                [id_user]
            )

            return{
                status: true,
                data: delUser
            }

        } catch (error) {
            console.error('deleteUser user module Error: ', error)
            return{
                status: false,
                error
            }
        }
    }

}

module.exports = new _user()