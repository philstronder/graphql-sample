const db = require('../../config/db');
const { brand: getBrand } = require('../Query/brand')

module.exports = {
    async newBrand(_, { data }, ctx) {
        ctx && ctx.validateAdmin()

        try {
            const [ id ] = await db('brands')
                .insert(data)

            return db('brands')
                .where({id})
                .first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async deleteBrand(_, args, ctx) {
        ctx && ctx.validateAdmin()

        try {
            const brand = await getBrand(_, args)
            if(brand) {
                const {id} = brand
                await db('brands')
                    .where({id})
                    .delete()
            }
            return brand
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async updateBrand(_, args, ctx) {
        ctx && ctx.validateAdmin()

        try {
            const brand = await getBrand(_, args)
            if(brand) {
                const {id} = brand
                await db('brands')
                    .where({id})
                    .update(data)
            }

            return { ...brand, ...data }
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    }
}

