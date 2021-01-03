import Express from 'express'
import config from '../config.json'

const app = Express()

app.get('/', (req, res) => {
  res.send('The Duck Creator Express Server')
})

app.listen(config.port, () => {
  console.log('Start TDC App')
  console.log('Backend App Running at Port', config.port)
  console.log('-----------')
})
