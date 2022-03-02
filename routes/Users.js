module.exports = function (router) {
    const {
        registerUser,
        loginUser,
        getUsers,
    } = require('../controllers/users')
    const { auth } = require('../middlewares/auth')

    router.post('/user/register', registerUser)
    router.post('/user/login', loginUser)
    router.get('/users', auth, getUsers)
}
