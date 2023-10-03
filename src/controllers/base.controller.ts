import express, { Express, Request, Response } from 'express'

const app: Express = express()
import userRoutes from './user'
import meetingRoutes from './meeting'
import presenceRoutes from './presence'

// app.use('/', (request: Request, response: Response) => {
//     response.status(200).json('ok')
// })

app.use(express.json())
app.use('/user', userRoutes)
app.use('/meeting', meetingRoutes)
app.use('/presence', presenceRoutes)

export default app