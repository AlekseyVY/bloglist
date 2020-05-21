const userRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')




userRouter.get('/', async (request, response) => {
    const result = await User.find({})
    response.json(result.map(u => u.toJSON()))
})

userRouter.post('/', async (request, response) => {
    const body = request.body

    const salt = 10
    const passwordHash = await bcrypt.hash(body.password, salt)
    const user = new User ({
        name: body.name,
        username: body.username,
        passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)

})



module.exports = userRouter