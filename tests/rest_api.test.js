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

    test('DELETE request removes blog frog from MongoDB', async () => {
        const blogsStart = await helper.blogsInDb()
        const blogDelete = blogsStart[0]
        await api.delete(`/api/blogs/${blogDelete.id}`).expect(204)
        const blogsEnd = await helper.blogsInDb()
        expect(blogsEnd).toHaveLength(helper.initialBlogs.length - 1)
        const content = blogsEnd.map(x => x.title)
        expect(content).not.toContain(blogDelete.title)
    })

    test('PUT request updates blog object in MongoDB', async () => {
        const blogToUpdate = {
            title: "Mars are first planet",
            author: "Elon Musk",
            url: "http:/marscolony/true",
            likes: 999999999999,
            id: "5ec40f7b0106e62ad48bd397"
        }
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)
    })
})

describe('User RESTful API testing', () => {
    test('Test that invalid user cannot be added', async () => {
        const newUser = {
            name: "Aleksey",
            password: "122345"
        }

        await api.post('/api/users').send(newUser)
            .expect(500)
    })

    test('Test that password with less than 3 char is invalid', async () => {
        const newUser = {
            name: " Alekseyvyx",
            username: "alekseyvyx1",
            password: "1"
        }
        await api.post('/api/users').send(newUser)
            .expect(400)
    })
})


afterAll(() => {
    mongoose.connection.close()
})
