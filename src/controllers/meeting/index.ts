import express, { Request, Response, Router } from 'express'
import * as meetingController from './meeting.controller'

const router: Router = express.Router()

router.get('/', meetingController.getAll)
router.post('/', meetingController.createMeeting)
router.put('/:id', meetingController.updateMeeting)
router.delete('/:id', meetingController.deleteMeeting)
router.delete('/', meetingController.deleteAll)

export default router