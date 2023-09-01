const mongoose = require('mongoose')

/* The code is defining a schema for a MongoDB collection using Mongoose. */

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


/* `module.exports = mongoose.model('People', peopleSchema)` is exporting a Mongoose model named
"People" that is based on the defined schema `peopleSchema`. This allows other parts of the code to
import and use the "People" model to interact with the corresponding MongoDB collection. */

module.exports = mongoose.model('People', peopleSchema)