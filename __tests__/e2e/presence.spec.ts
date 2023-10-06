import {
    jest,
    describe,
    test,
    expect,
    beforeAll,
    afterAll,
    afterEach
} from '@jest/globals'

import supertest, { Response } from 'supertest'

import server from '../../src/server'
import { UserModel } from '../../src/models/user';
import { MeetingModel } from '../../src/models/meeting';
import { PresenceModel } from '../../src/models/presence';

describe('API E2E Tests', () => {

    let currentUser: Response;
    let currentMeeting: Response;

    afterAll((done) => {

        Promise.all([
            UserModel.destroy({ where: {} }),
            MeetingModel.destroy({ where: {} }),
            PresenceModel.destroy({ where: {} })
        ]).then(() => {
            server.close(done)
        })
    })

    beforeAll(async () => {
        currentUser = await supertest(server)
            .post('/user')
            .send({ firstName: 'test', lastName: 'e2e', phone: '519998888', role: 'desbrava' })

        currentMeeting = await supertest(server)
            .post('/meeting')
            .send({ meetingDate: '2023-10-02', activity: 'Pioneiria, Fogos', comments: 'blabla' })
    })


    test('POST presence with success', async () => {
        console.log('HERE', [currentUser.body, currentMeeting.body])
        const response = await supertest(server)
            .post('/presence')
            .send({ userId: currentUser.body, meetingId: currentMeeting.body })


        expect(response.status).toEqual(201)
        expect(response.text).not.toContain('issues')
    })

    test('GET presence with success', async () => {
        const response = await supertest(server)
            .get('/presence')

        expect(response.status).toEqual(200)
    })

    test('PUT presence with success', async () => {
        const response = await supertest(server)
            .put('/presence/1')
            .send({ userId: 1, meetingId: 1 })

        expect(response.status).toEqual(200)
    })

    test('DELETE presence with success', async () => {
        const response = await supertest(server)
            .delete('/presence/1')

        expect(response.status).toEqual(200)
    })
})