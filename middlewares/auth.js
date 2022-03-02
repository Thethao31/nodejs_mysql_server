const { verify } = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
    // accessToken la ten key
    const accessToken = req.header('accessToken')

    if (!accessToken) return res.json({ error: 'User not logged in!' })

    try {
        // check cai accessToken o tren = SECRET khong
        const validToken = verify(accessToken, process.env.SECRET)
        // lay accessToken vua sign ben login
        req.user = validToken
        console.log(validToken)
        if (validToken) return next()
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error)
    }
}

module.exports = { auth }
