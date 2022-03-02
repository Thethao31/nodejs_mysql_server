const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())

const db = require('./models')

require('./routes/Posts')(app)
require('./routes/Comments')(app)
require('./routes/Users')(app)
require('./routes/Likes')(app)

const PORT = process.env.PORT || 3000

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
