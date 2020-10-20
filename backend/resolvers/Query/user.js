const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const {getLoggedUser} = require('../common/user')

module.exports = {
    async login(_, { data }) {
        const user = await db('users')
            .where({email: data.email})
            .first()

        if(!user) {
            throw new Error('Invalid username/password')
        }

        const passwordMatch = bcrypt.compareSync(data.password, user.password)

        if(!passwordMatch) {
            throw new Error('Invalid username/password')
        }
        
        return getLoggedUser(user)
    },
    users(parent, args, ctx) {
        ctx && ctx.validateAdmin()
        
        return db('users')
    },
    user(_, { filter }, ctx) {
        ctx && ctx.validateUserFilter(filter)
        if(!filter) return null
        const { id, email } = filter
        if(id) {
            return db('users')
                .where({ id })
                .first()
        } else if(email) {
            return db('users')
                .where({ email })
                .first()
        } else {
            return null
        }
    }
}