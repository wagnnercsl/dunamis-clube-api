import { z } from 'zod'
import { Request, Response, Router } from 'express'
import { MeetingModel } from '../../models/meeting'

const meetingSchema = z.object({
    id: z.number().optional(),
    meetingDate: z.string().nonempty({ message: 'A data precisa ser informada!' }).max(20),
    activity: z.string().nonempty({ message: 'Não pode ser vazio!' }).max(250),
    comments: z.string()
})

type Meeting = z.infer<typeof meetingSchema>

export async function getAll(req: Request, res: Response) {
    try {
        const result = await MeetingModel.findAll() as unknown as Meeting[]

        res.json(result).status(200)
    } catch (error) {
        console.log(error)
    }
}

export async function createMeeting(req: Request, res: Response) {
    try {
        const { meetingDate, activity, comments } = req.body as Meeting

        const validatedSchema = meetingSchema.parse({ meetingDate, activity, comments: '' })

        if (validatedSchema) {
            const result = await MeetingModel.create({ meetingDate, activity, comments }) as unknown as Meeting

            console.log("Meeting created! ", result.id)

            res.status(201).json(result.id)
        } else {
            res.status(400).json()
        }
    } catch (error: any) {
        res.status(500).json(error)
    }
}

export async function updateMeeting(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { meetingDate, activity, comments } = req.body as Meeting

        const result = await MeetingModel.update({ meetingDate, activity, comments }, {
            where: {
                id: id
            }
        }) as unknown as Meeting

        console.log("User updated! ", result.activity)

        res.json(result).status(200)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteMeeting(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { meetingDate, activity, comments } = req.body as Meeting

        const result = await MeetingModel.destroy({
            where: {
                id: id
            }
        }) as unknown as Meeting

        console.log("Meeting deleted! ", result)

        res.json(result).status(200)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteAll(req: Request, res: Response) {
    try {

        const result = await MeetingModel.destroy({ truncate: true })

        console.log("User deleted! ", result)

        res.json(result).status(201)
    } catch (error) {
        console.log(error)
    }
}