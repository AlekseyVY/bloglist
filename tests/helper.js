const Blog = require('../models/bloglist')

const initialBlogs = [
    {
        title: 'Javascript for Dummies',
        author: "Aleksey Vasiliev",
        url: 'localhost://3001',
        likes: 45
    },
    {
        title: 'Superman fights Supergirl in marriage of doom',
        author: 'Some dude',
        url: 'http:/lol',
        likes: 9000
    },
    {
        title: 'Mars are first planet',
        author: 'Elon Musk',
        url: 'http:/marscolony/true',
        likes: 1
    }
]

const blogsInDb = async (request, response) => {
    const blog = await Blog.find({})
    response.json(blog.map(x => x.toJSON()))
}

module.exports = {
    initialBlogs,
    blogsInDb
}
