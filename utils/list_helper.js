const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let tmp = 0
    blogs.map(blog => tmp += blog.likes)
    return tmp
}

const favoriteBlog = (blogs) => {
    let tmpLikes = 0
    let tmpBlogObject = null

    blogs.map(blog => {
        if(blog.likes > tmpLikes){
            tmpLikes = blog.likes
            tmpBlogObject = blog
        }
    })
    return tmpBlogObject
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}

