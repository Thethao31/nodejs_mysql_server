module.exports = function (router) {
    const { likes } = require('../controllers/likes')
    const { auth } = require('../middlewares/auth')

    router.post('/likes', auth, likes)
}
