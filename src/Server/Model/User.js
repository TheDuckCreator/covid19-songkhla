import Mongoose from 'mongoose'
const Schema = Mongoose.Schema

const userSchema = new Schema({
  id: String,
  name: String,
  tel: String,
  role: { type: String, default: 'USER' },
})

const userModel = Mongoose.model('User', userSchema)
export default userModel
