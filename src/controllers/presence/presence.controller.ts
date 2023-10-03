import { z } from 'zod'
import { Request, Response, Router } from 'express'
import { PresenceModel } from '../../models/meetingUser'

const meetingSchema = z.object({
    id: z.number().optional(),
    userId: z.number().min(1, { message: 'Deve ser um número maior que zero.' }),
    meetingId: z.number().min(1, { message: 'Deve ser um número maior que zero.' }),
})

type Presence = z.infer<typeof meetingSchema>

export async function getAll(req: Request, res: Response) {
    try {
        const result = await PresenceModel.findAll() as unknown as Presence[]

        res.json(result).status(200)
    } catch (error) {
        console.log(error)
    }
}

export async function createPresence(req: Request, res: Response) {
    try {
        const { userId, meetingId } = req.body as Presence

        const validatedSchema = meetingSchema.parse({ userId, meetingId })

        if (validatedSchema) {
            const result = await PresenceModel.create({ userId, meetingId }) as unknown as Presence

            console.log("Presence created! ", result.id)

            res.status(201).json(result.id)
        } else {
            res.status(400).json()
        }
    } catch (error: any) {
        res.status(500).json(error)
    }
}

export async function updatePresence(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { userId, meetingId } = req.body as Presence

        const result = await PresenceModel.update({ userId, meetingId }, {
            where: {
                id: id
            }
        }) as unknown as Presence

        console.log("Presence updated! ", result.id)

        res.json(result).status(200)
    } catch (error) {
        console.log(error)
    }
}

export async function deletePresence(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { userId, meetingId } = req.body as Presence

        const result = await PresenceModel.destroy({
            where: {
                id: id
            }
        }) as unknown as Presence

        console.log("Presence deleted! ", result)

        res.json(result).status(200)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteAll(req: Request, res: Response) {
    try {

        const result = await PresenceModel.destroy({ truncate: true })

        console.log("User deleted! ", result)

        res.json(result).status(201)
    } catch (error) {
        console.log(error)
    }
}