const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
    response.json(result.map(x => x.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
     const blog = new Blog(request.body)

    const result = await blog.save()
    response.json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const updateBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const result = await Blog.findByIdAndUpdate(request.params.id, updateBlog, {new: true})
    response.json(result)
})

module.exports = blogsRouter
