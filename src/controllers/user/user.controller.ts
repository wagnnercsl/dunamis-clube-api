import { z } from 'zod'
import { Request, Response, Router } from 'express'

import { UserModel } from '../../models/user'

const userSchema = z.object({
    id: z.number().optional(),
    firstName: z.string().nonempty({ message: 'Não pode ser vazio!' }).max(50),
    lastName: z.string().nonempty({ message: 'Não pode ser vazio!' }).max(50),
    phone: z.string().nonempty({ message: 'Não pode ser vazio!' }).max(50),
    role: z.string().nonempty({ message: 'Não pode ser vazio!' }).max(50)
})

type User = z.infer<typeof userSchema>

export async function getAll(req: Request, res: Response) {
    try {
        const result = await UserModel.findAll() as unknown as User[]

        res.json(result).status(200)
    } catch (error) {
        console.log(error)
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const { firstName, lastName, phone, role } = req.body as User

        const validatedSchema = userSchema.parse({ firstName, lastName, phone, role })

        if (validatedSchema) {
            const result = await UserModel.create({ firstName, lastName, phone, role }) as unknown as User

            console.log("User created! ", result.id)

            res.status(201).json(result.id)
        } else {
            res.status(400).json()
        }
    } catch (error: any) {
        res.status(500).json(error)
        // res.status(500).json({ code: error?.issues[0].code, path: error?.issues[0].path, message: error?.issues[0].message })
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { firstName, lastName } = req.body

        const result = await UserModel.update({ firstName, lastName }, {
            where: {
                id: id
            }
        }) as unknown as User

        console.log("User updated! ", result.firstName)

        res.json(result).status(200)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { firstName, lastName } = req.body

        const result = await UserModel.destroy({
            where: {
                id: id
            }
        }) as unknown as User

        console.log("User deleted! ", result)

        res.json(result).status(200)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteAll(req: Request, res: Response) {
    try {
        const result = await UserModel.destroy({ truncate: true }) as unknown as User

        console.log("User deleted! ", result)

        res.json(result).status(201)
    } catch (error) {
        console.log(error)
    }
}