import express, { Request, Response, Router } from 'express'
import * as userController from './user.controller'
import User2Controller from './user2.controller'
import { UserModel } from '@models/user'

const router: Router = express.Router()

const user2Controller = new User2Controller(UserModel);

router.get('/', userController.getAll)
router.get('/use2', user2Controller.getAll)
router.get('/:id', user2Controller.getOne)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router