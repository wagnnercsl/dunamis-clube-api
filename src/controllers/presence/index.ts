import express, { Request, Response, Router } from 'express'
import * as presenceController from './presence.controller'

const router: Router = express.Router()

router.get('/', presenceController.getAll)
router.post('/', presenceController.createPresence)
router.put('/:id', presenceController.updatePresence)
router.delete('/:id', presenceController.deletePresence)
router.delete('/', presenceController.deleteAll)

export default router