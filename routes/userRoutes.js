const router = require('express').Router()
const { User } = require('../models')

//GET ALL USERS
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).populate('thoughts').populate('friends')
    res.json(users)
  } catch (err) {
    res.status(500).json({ err })
  }
})

//GET A USER BY ID
router.get('/users/:id', async ({ params: { id } }, res) => {
  try {
    const user = await User.findById(id).populate('thoughts').populate('friends')
    res.json(user)
  } catch (error) {
    res.status(500).json({ error })
  }
})

//CREATE NEW USER
router.post('/users', async ({ body }, res) => {
  try {
    const user = await User.create(body)
    res.json(user)
  } catch (error) {
    res.status(500).json({ error })
  }
})

//UPDATE A USER BY ID
router.put('/users/:id', async ({ body, params: { id } }, res) => {
  try {
    const user = await User.findByIdAndUpdate(id, body)
    res.json('User info updated')
  } catch (error) {
    res.status(500).json({ error })
  }
})

//DELETE USER BY ID
router.delete('/users/:id', async ({ params: { id } }, res) => {
  try {
    const user = await User.findByIdAndDelete(id)
    res.json('User deleted')
  } catch (error) {
    res.status(500).json({ error })
  }
})

//FRIENDS
//ADD NEW FRIEND TO USER'S FRIEND LIST
router.post('/users/:id/friends/:friendId', async ({ params: { id, friendId } }, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: id, },
      { $push: { friends: friendId } },
      { new: true }
    )
    res.json('Friend successfully added')
  } catch (error) {
    res.status(500).json({ err })
  }
})

//REMOVE FRIEND FROM USER'S FRIEND LIST
router.delete('/users/:id/friends/:friendId', async ({ params: { id, friendId } }, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: id, },
      { $pull: { friends: friendId } },
      { new: true }
    )
    res.json('Friend successfully deleted')
  } catch (error) {
    res.status(500).json({ err })
  }
})


module.exports = router


