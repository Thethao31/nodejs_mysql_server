const { Comments } = require('../models')
const { sign } = require('jsonwebtoken')

exports.createComment = async (req, res) => {
    try {
        const comment = req.body
        const username = req.user.username
        comment.username = username
        await Comments.create(comment)
        res.status(200).json({
            message: 'createComment successfully',
            count: comment.length,
            data: comment,
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error)
    }
}

exports.getCommentById = async (req, res, next) => {
    const { postId } = req.params
    try {
        const comment = await Comments.findAll({ where: { PostId: postId } })
        res.status(200).json({
            message: 'getCommentById successfully',
            data: comment,
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error)
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params
        await Comments.destroy({ where: { id: commentId } })
        res.status(200).json({
            message: 'deleteComment successfully',
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error)
    }
}
