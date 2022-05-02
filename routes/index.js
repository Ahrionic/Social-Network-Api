const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./thoughtRoutes.js'))

router.use((req, res) => {
  return res.send('Incorrect Route')
})

module.exports = router