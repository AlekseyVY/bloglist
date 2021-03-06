const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path:   ', request.path)
    logger.info('Body:   ', request.body)
    logger.info('--------')
    next()
}
const getToken = (request, response, next) => {
    const auth = request.get('authorization')
    if(auth && auth.toLowerCase().startsWith('bearer ')){
        request.token = auth.substring(7)
    }
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response) => {
    logger.error(error.message)

    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    getToken
}
