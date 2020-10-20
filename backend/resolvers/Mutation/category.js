const db = require('../../config/db')
const {category: getCategory} = require('../Query/category')

module.exports = {
    async newCategory(_, {data}, ctx){
        ctx && ctx.validateAdmin()

        try{
            const [id] = await db('categories')
                .insert(data)

            return db('categories')
                .where({id})
                .first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async deleteCategory(){
        ctx && ctx.validateAdmin()

        try{
            const category = getCategory(_, args)
            if(category) {
                const {id} = category

                await db('categories')
                    .where({id})
                    .delete()
            }

            return category
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async updateCategory(_, args, ctx) {
        ctx && ctx.validateAdmin()

        try{
            const category = getCategory(_, args)

            if(category) {
                const {id} = category
                await db('categories')
                    .where({id})
                    .update(data)
            }

            return {...category, ...data}
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    }
}