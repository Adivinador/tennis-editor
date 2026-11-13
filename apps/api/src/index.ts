import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import analyzeRouter from './routes/tennis/analyze.js'
import deadtimeRouter from './routes/tennis/deadtime.js'
import suggestRouter from './routes/tennis/suggest.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})
app.use('/api/tennis/analyze', analyzeRouter)
app.use('/api/tennis/deadtime', deadtimeRouter)
app.use('/api/tennis/suggest', suggestRouter)

const port = Number(process.env.PORT) || 3000
app.listen(port, () => {
  console.log(`Tennis Editor API on http://localhost:${port}`)
})