import express, { Express } from 'express'
import cors from 'cors'

const app: Express = express()
import userRoutes from './user'
import meetingRoutes from './meeting'
import presenceRoutes from './presence'

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/user', userRoutes)
app.use('/meeting', meetingRoutes)
app.use('/presence', presenceRoutes)

export default app