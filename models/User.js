const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  })

const User = model('User', userSchema)

//virtual property friendCount to get number of friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length
})

const handleError = (err) => console.error(err)

module.exports = User
