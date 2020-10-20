const db = require('../../config/db')

module.exports = {
    brands(parent, args, ctx) {
        ctx && ctx.validateAdmin()

        return db('brands')
    },
    brand(_, { filter }, ctx) {
        ctx && ctx.validateAdmin()

        if(!filter) return null
        const {id, name} = filter
        if(id) {
            return db('brands')
                .where({id})
                .first()
        } else if(name) {
            return db('brands')
                .where({name})
                .first()
        } else {
            return null
        }
    }
}