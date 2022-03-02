module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    // nếu xóa bài post thì nó sẽ xóa luôn cả
    // comment và like của bài post đó
    // (Foregin key)
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: 'cascade',
        })

        Posts.hasMany(models.Likes, {
            onDelete: 'cascade',
        })
    }
    return Posts
}
