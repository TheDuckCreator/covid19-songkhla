import Express from 'express'
import StatRoute from './Routes/StatRoute'
const app = Express.Router()

app.get('/hello', (req, res) => {
  res.send('World')
})

app.use('/case', StatRoute)

export default app
