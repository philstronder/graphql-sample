const db = require('../../config/db')

module.exports = {
    categories(parent, args, ctx) {
        ctx && ctx.validateAdmin()

        return db('categories')
    },
    category(_, {filter}, ctx) {
        ctx && ctx.validateAdmin()

        if(!filter) return null
        const {id, name} = filter
        if(id) {
            return db('categories')
                .where({id})
                .first()
        } else if (name) {
            return db('categories')
                .where({name})
                .first()
        } else {
            return null
        }
    }
}