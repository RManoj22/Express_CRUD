const express = require('express')
const router = express.Router()
const Model = require('../models/schema')


/* This code is defining a GET route for the root URL ("/"). When a GET request is made to this route,
it will execute the callback function. */
router.get('/', async (req, res) => {

    try {
        const users = await Model.find();
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/* This code is defining a GET route with a dynamic parameter `:id`. When a GET request is made to this
route, it will execute the `getUsers` middleware function first, which retrieves the user with the
specified `id` from the database and stores it in the `res.user` property. */
router.get('/:id', getUsers, (req, res) => {
    res.json(res.user)
})

/* This code is defining a POST route for the root URL ("/"). When a POST request is made to this
route, it will execute the callback function. */
router.post('/', async (req, res) => {

    const users = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const newUser = await users.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

/* This code is defining a PATCH route with a dynamic parameter `:id`. When a PATCH request is made to
this route, it will execute the `getUsers` middleware function first, which retrieves the user with
the specified `id` from the database and stores it in the `res.user` property. */
router.patch('/:id', getUsers, async(req, res) => { 
    if(req.body.name != null){
        res.user.name = req.body.name
    }
    if(req.body.age != null){
        res.user.age = req.body.age
    }
    try {
        const updatedUser = await res.user.save()
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: err.message })
    }
})

/* This code is defining a DELETE route with a dynamic parameter `:id`. When a DELETE request is made
to this route, it will execute the `getUsers` middleware function first, which retrieves the user
with the specified `id` from the database and stores it in the `res.user` property. */
router.delete('/:id', getUsers, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: 'deleted'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/**
 * The function is an asynchronous function that retrieves a user by their ID and sets it as a property
 * on the response object.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, etc. It is used to
 * retrieve information from the client and pass it to the server.
 * @param res - The `res` parameter is the response object in Express.js. It is used to send the HTTP
 * response back to the client.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used when you want to perform some
 * operations in the current middleware function and then pass control to the next middleware function.
 * In this case, `next()` is called
 * @returns In this code, if the user is not found, a response with status code 404 and a JSON object
 * containing the message "Cannot find user" will be returned. If there is an error during the
 * execution of the code, a response with status code 500 and a JSON object containing the error
 * message will be returned.
 */
async function getUsers(req, res, next) {
    let user
    try {
        user = await Model.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
        res.user = user
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

module.exports = router