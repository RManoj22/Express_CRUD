require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoute = require('./routers/users')


/* This code is establishing a connection to a MongoDB database using Mongoose. */

mongoose.connect(process.env.URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected'))


/* `app.use(express.json())` is a middleware function that parses incoming requests with JSON payloads.
It allows the server to handle JSON data sent in the request body. This middleware function is
necessary to parse and access the JSON data in the request object in order to process it further. */

app.use(express.json())

/* `app.use(express.urlencoded({extended: true}))` is a middleware function that parses incoming
requests with URL-encoded payloads. It allows the server to handle URL-encoded form data sent in the
request body. This middleware function is necessary to parse and access the form data in the request
object in order to process it further. The `extended: true` option allows for parsing of nested
objects in the URL-encoded data. */

app.use(express.urlencoded({extended: true}))

/* `app.set('view engine','ejs')` is setting the view engine for the Express application to EJS
(Embedded JavaScript). */

app.set('view engine','ejs')

/* `app.use('/users', userRoute)` is a middleware function
that is mounting the specified routers on the specified paths. */
app.use('/users', userRoute)


/* `app.use(express.static('public'))` is a middleware function that serves static files from the
specified directory. In this case, it is serving static files from the 'public' directory. */

app.use(express.static('public'))

app.listen(8080, () => console.log('running on 8080'))