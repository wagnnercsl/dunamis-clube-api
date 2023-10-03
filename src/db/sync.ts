import { UserModel } from "../models/user"
import { MeetingModel } from "../models/meeting"
import { PresenceModel } from "../models/meetingUser"

async function syncDB() {
    console.warn('SYNCYNG ALL TABLES!')
    await UserModel.sync({ alter: true })
    await MeetingModel.sync({ alter: true })
    await PresenceModel.sync({ alter: true })
}

syncDB()
