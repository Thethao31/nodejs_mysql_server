module.exports = function (router) {
    const {
        createComment,
        getCommentById,
        deleteComment,
    } = require('../controllers/comment')
    const { auth } = require('../middlewares/auth')

    router.get('/comments/:postId', getCommentById)
    router.post('/create/comment', auth, createComment)
    router.delete('/delete/comment/:commentId', auth, deleteComment)
}
