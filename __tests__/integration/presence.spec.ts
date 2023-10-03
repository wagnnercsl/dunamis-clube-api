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

describe('API E2E Tests', () => {

    let currentUser: Response;
    let currentMeeting: Response;

    beforeAll(async () => {

        currentUser = await supertest(server)
            .post('/user')
            .send({ firstName: 'test', lastName: 'e2e' })

        currentMeeting = await supertest(server)
            .post('/meeting')
            .send({ activity: 'Pioneiria, Fogos', comments: 'blabla' })
    })


    test('POST presence with success', async () => {
        const response = await supertest(server)
            .post('/presence')
            .send({ userId: currentUser, meetingId: currentMeeting })

        expect(response.status).toEqual(201)
        expect(response.text).not.toContain('issues')
    })

    test('POST presence with fail', async () => {
        const response = await supertest(server)
            .post('/presence')
            .send({ userId: 1, meetingId: 1 })

        expect(response.status).toEqual(500)
        expect(response.text).toContain('issues')
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