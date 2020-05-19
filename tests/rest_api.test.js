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

    test('GET on api/blogs returns all blogs', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

})


afterAll(() => {
    mongoose.connection.close()
})
