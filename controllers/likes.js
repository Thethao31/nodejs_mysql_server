const { Likes } = require('../models')
const { sign } = require('jsonwebtoken')

exports.likes = async (req, res) => {
    const { PostId } = req.body
    // req.user da sign ben login
    const UserId = req.user.id

    await Likes.findOne({
        where: { PostId: PostId, UserId: UserId },
    })

    if (!found) {
        await Likes.create({ PostId: PostId, UserId: UserId })
        res.json({ liked: true })
    } else {
        await Likes.destroy({
            where: { PostId: PostId, UserId: UserId },
        })
        res.json({ liked: false })
    }
}
