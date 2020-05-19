const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
    response.json(result.map(x => x.toJSON()))
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    blog.save().then(result => {
        response.status(201).json(result)
    }).catch(error => next(error))
})


module.exports = blogsRouter
