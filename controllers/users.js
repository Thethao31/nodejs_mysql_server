const { Users } = require('../models')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { sign } = require('jsonwebtoken')

exports.registerUser = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const oldUser = await Users.findOne({ where: { username: username } })

        if (oldUser)
            return res.status(400).json({ message: 'User already exists' })

        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash,
            })
            res.status(201).json({
                message: 'registerUser successfully',
            })
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error)
    }
}

exports.loginUser = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const user = await Users.findOne({ where: { username: username } })

        if (!user)
            return res.status(404).json({ message: "User doesn't exists" })

        // check password body = pw in database
        bcrypt.compare(password, user.password).then(async (match) => {
            if (!match)
                res.json({ error: 'Wrong Username And Password Combination' })

            // sign ca cai accessToken nay ra roi gui cho client
            const accessToken = sign(
                { username: user.username, id: user.id },
                process.env.SECRET
            )
            res.status(200).json({
                message: 'login successfully',
                token: accessToken,
                username: username,
                id: user.id,
            })
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error)
    }
}

exports.getUsers = async (req, res) => {
    res.status(200).json({ message: 'Get Users', users: req.user })
}
