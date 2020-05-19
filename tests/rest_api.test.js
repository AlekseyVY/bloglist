const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./helper')

const Blog = require('../models/bloglist')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObject = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)

})

describe('RESTful API testing block: ', () => {

    test('GET request on api/blogs returns all blogs', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('check that returned blog have id property', async () => {
        const result = await api.get('/api/blogs')
            .expect(200)
        expect(result.body[0].id).toBeDefined()
    })

    test('POST request saves blog to MongoDB', async () => {
        const newBlog = {
            title: "Shield Hero",
            author: 'some japanese dude',
            url: 'google.com',
            likes: 777
        }
        await api.post('/api/blogs').send(newBlog)
        const blogsEnd = await helper.blogsInDb()
        expect(blogsEnd).toHaveLength(helper.initialBlogs.length + 1)
        const content = blogsEnd.map(x => x.title)
        expect(content).toContain('Shield Hero')
    })

})


afterAll(() => {
    mongoose.connection.close()
})
