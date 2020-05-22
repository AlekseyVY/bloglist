const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const getToken = request => {
    const auth = request.get('authorization')
    if(auth && auth.toLowerCase().startsWith('bearer ')){
        return auth.substring(7)
    }
    return null
}

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
     const body = request.body
    const token = getToken(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
        return response.status(401).json({error: 'token missing r invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.json(result.toJSON())
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
