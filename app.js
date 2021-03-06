const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/bloglists')
const middleware = require('./utils/middleware')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/login')

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        logger.info('connected to MongoDB')
    }).catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.getToken)

app.use('/api/blogs', blogsRouter)
app.use('/api/users/', userRouter)
app.use('/api/login/', loginRouter)

if(process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/TestRouter')
    app.use('/api/testing', testRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
