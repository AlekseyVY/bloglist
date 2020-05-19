const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
    response.json(result.map(x => x.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
     const blog = new Blog(request.body)

    const result = await blog.save()
    response.json(result)
})


module.exports = blogsRouter
