const { Posts } = require('../models')
const { sign } = require('jsonwebtoken')

exports.getAll = async (req, res, next) => {
    try {
        const posts = await Posts.findAll()
        res.status(200).json({
            message: 'getAll posts successfully',
            count: posts.length,
            data: posts,
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error)
    }
}

exports.getPostById = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await Posts.findByPk(id)
        res.status(200).json({
            message: 'getPostById successfully',
            data: post,
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error)
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const post = req.body

        post.username = req.user.username
        post.UserId = req.user.id

        await Posts.create(post)

        res.status(200).json({
            message: 'create post successfully',
            data: post,
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error)
    }
}
