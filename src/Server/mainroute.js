import Express from 'express'
const app = Express.Router()

app.get('/hello', (req, res) => {
  res.send('World')
})

export default app
