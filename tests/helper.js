const Blog = require('../models/bloglist')
const User = require('../models/users')

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

const initialUsers = [
    {
        user: "Aleksey",
        username: "alekseyvyx",
        password: "12345"
    },
    {
        user: "Kirill",
        username: "kirillvyx",
        password: "54321"
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb,
    initialUsers
}
