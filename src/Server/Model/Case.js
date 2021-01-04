import Mongoose from 'mongoose'
const Schema = Mongoose.Schema

const caseSchema = new Schema({
  date: String,
  newCase: Number,
  newFinding: Number,
  newNegative: Number,
  allFinding: Number,
  allNegative: Number,
  secondWaveCase: Number,
  allCase: Number,
  waiting: Number,
  riskGroup: Number,
  groupColor: String,
})

const userModel = Mongoose.model('Case', caseSchema)
export default userModel
