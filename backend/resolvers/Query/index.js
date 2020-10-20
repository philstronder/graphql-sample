const user = require('./user')
const profile = require('./profile')
const brand = require('./brand')
const category = require('./category')

 module.exports = {
    ...user,
    ...profile,
    ...brand,
    ...category
 }