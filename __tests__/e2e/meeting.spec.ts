import {
    describe,
    test,
    expect,
    beforeAll,
    afterAll
} from '@jest/globals'

import supertest from 'supertest'

import server from '../../src/server'
import { MeetingModel } from '../../src/models/meeting'

describe('Meeting E2E tests', () => {

    beforeAll(async () => {
        await supertest(server)
            .post('/meeting')
            .send({ meetingDate: '2023-10-02', activity: 'Pioneiria, Fogos', comments: 'blabla' })
    })

    afterAll((done) => {
        Promise.all([
            MeetingModel.destroy({ where: {} })
        ]).then(() => {
            server.close(done)
        })
    })

    test('Create meeting with success', async () => {
        const response = await supertest(server)
            .post('/meeting')
            .send({ meetingDate: '2023-10-02', activity: 'Pioneiria, Fogos', comments: 'blabla' })

        expect(response.status).toEqual(201)
        expect(response.text).not.toContain('issues')
    })

    test('Create meeting with fail', async () => {
        const response = await supertest(server)
            .post('/meeting')
            .send({ activity: 'Pioneiria, Fogos', comments: 'blabla' })

        expect(response.status).toEqual(500)
        expect(response.text).toContain('issues')
    })

    test('List all meeting with success', async () => {
        const response = await supertest(server)
            .get('/meeting')

        expect(response.status).toEqual(200)
    })

    test('Update meeting with success', async () => {
        const response = await supertest(server)
            .put('/meeting/1')
            .send({ meetingDate: '2023-10-02', activity: 'update + Pioneiria, Fogos', comments: 'blabla' })

        expect(response.status).toEqual(200)
    })

    test('Delete meeting with success', async () => {
        const response = await supertest(server)
            .delete('/meeting/1')

        expect(response.status).toEqual(200)
    })
})