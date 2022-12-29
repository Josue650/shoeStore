const { Schema, model } = require('mongoose')

const shoeSchema = new Schema ({
    name: String,
    color: String,
    rare: Boolean
}, {
    timestamps:true
})

const Shoe = model('Shoe', shoeSchema)

module.export = Shoe
