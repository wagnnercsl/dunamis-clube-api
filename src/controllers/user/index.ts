import express, { Request, Response, Router } from 'express'
import * as userController from './user.controller'

const router: Router = express.Router()

router.get('/', userController.getAll)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.delete('/', userController.deleteAll)

export default router