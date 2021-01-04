import Express from 'express'
import CaseModel from '../Model/Case'
import _ from 'lodash'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import hash from 'object-hash'
require('dotenv').config()

const app = Express.Router()
const secret = hash({ name: 'TheDuckCreator' })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/access/', async (req, res) => {
  console.log('User Request Token')
  console.log(secret)
  let payload = req.body
  let token = jwt.sign(payload, secret)
  res.send(token)
})

app.get('/', async (req, res) => {
  let allCase = await CaseModel.find({})
  res.send(allCase)
})

app.get('/latest/', async (req, res) => {
  let allCase = await CaseModel.find({})
  let sortedCase = _.take(_.orderBy(allCase, ['date', 'desc']), 1)
  res.send(sortedCase)
})

app.post(
  '/',
  async (req, res, next) => {
    let jwtKey = _.last(_.split(req.headers.authorization, ' '))
    try {
      let decode = jwt.verify(jwtKey, secret)
      if (decode) {
        console.log('Authen Pass!')
        next()
      }
    } catch (err) {
      console.log('Invalid Token')
      console.log(err)
      res.sendStatus(403)
    }
  },
  async (req, res) => {
    let payload = req.body
    let newCase = await new CaseModel(payload)
    newCase.save()

    if (newCase) {
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }
  }
)

app.put(
  '/:id',
  async (req, res, next) => {
    let jwtKey = _.last(_.split(req.headers.authorization, ' '))
    try {
      let decode = jwt.verify(jwtKey, secret)
      if (decode) {
        console.log('Authen Pass!')
        next()
      }
    } catch (err) {
      console.log('Invalid Token')
      console.log(err)
      res.sendStatus(403)
    }
  },
  async (req, res) => {
    let caseId = req.params.id
    let payload = req.body
    let editedCase = await CaseModel.findOneAndUpdate(caseId, { $set: payload })
    if (editedCase) {
      res.send(200)
    } else {
      res.send(400)
    }
  }
)

export default app
