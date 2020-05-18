const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let tmp = 0
    blogs.map(blog => tmp += blog.likes)
    return tmp
}

module.exports = {
    dummy,
    totalLikes
}

