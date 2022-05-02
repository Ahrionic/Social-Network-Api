const router = require('express').Router()
const { Thought, User } = require('../models')

//GET ALL THOUGHTS
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find({})
    res.json(thoughts)
  } catch (err) {
    res.status(500).json({ err })
  }
})

//GET A THOUGHT BY ID
router.get('/thoughts/:id', async ({ params: { id } }, res) => {
  try {
    const thought = await Thought.findById(id);
    res.json(thought)
  } catch (error) {
    res.status(500).json({ error })
  }
})

//CREATE NEW THOUGHT AND PLUG TO ASSOCIATED USER BY USERNAME
router.post('/thoughts', async ({ body }, res) => {
  try {
    const thought = await Thought.create(body)
    res.json('Thought successfully created within user')
    return User.findOneAndUpdate(
      { username: thought.username },
      { $push: { thoughts: thought } },
      { new: true }
    )

  } catch (error) {
    res.status(500).json({ error })
  }
})

//UPDATE A THOUGHT BY ID
router.put('/thoughts/:id', async ({ body, params: { id } }, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(id, body)
    res.json('Thought updated')
  } catch (error) {
    res.status(500).json({ error })
  }
})

//DELETE THOUGHT BY ID
router.delete('/thoughts/:id', async ({ params: { id } }, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(id)
    res.json('Thought deleted')
  } catch (error) {
    res.status(500).json({ error })
  }
})

//REACTIONS
//create reaction stored in a single thought's reactions array field
router.post('/thoughts/:id/reactions', async ({ body, params: { id } }, res) => {
  try {
    await Thought.findByIdAndUpdate(
      { _id: id, },
      { $push: { reactions: body } },
      { new: true }
    )
    res.json('Reaction successfully added')

  } catch (error) {
    res.status(500).json({ err })
  }
})

//delete to pull and remove rxn by the reaction's reaction ID
router.delete('/thoughts/:id/reactions/:reactionId', async ({ params: { id, reactionId } }, res) => {
  try {
    await Thought.findOneAndUpdate(
      { _id: id, },
      { $pull: { reactions: { _id: reactionId } } },
      { runValidators: true, new: true }
    )
    res.json('Reaction successfully deleted')

  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router
