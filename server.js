const express = require('express')
const db = require('./config/connection')

const app = express()
const PORT = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(require('./routes'))

// sync sequelize models to the database, then turn on the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  })
})
