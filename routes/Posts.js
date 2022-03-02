module.exports = function (router) {
    const { getAll, createPost, getPostById } = require('../controllers/posts')
    const { auth } = require('../middlewares/auth')

    router.get('/posts', getAll)
    router.get('/post/:id', getPostById)
    router.post('/create/post', auth, createPost)
}
