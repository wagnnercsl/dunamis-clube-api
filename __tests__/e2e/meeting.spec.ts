import {
    jest,
    describe,
    test,
    expect,
    beforeAll,
    afterAll,
    afterEach
} from '@jest/globals'

import supertest from 'supertest'

import server from '../../src/server'

describe('API E2E Tests', () => {

    afterAll((done) => {

        supertest(server)
            .delete('/meeting')
            .send({})

        server.close(done)
    })

    test('POST meeting with success', async () => {
        const response = await supertest(server)
            .post('/meeting')
            .send({ meetingDate: '2023-10-02', activity: 'Pioneiria, Fogos', comments: 'blabla' })

        expect(response.status).toEqual(201)
        expect(response.text).not.toContain('issues')
    })

    test('POST meeting with fail', async () => {
        const response = await supertest(server)
            .post('/meeting')
            .send({ activity: 'Pioneiria, Fogos', comments: 'blabla' })

        expect(response.status).toEqual(500)
        expect(response.text).toContain('issues')
    })

    test('GET meeting with success', async () => {
        const response = await supertest(server)
            .get('/meeting')

        expect(response.status).toEqual(200)
    })

    test('PUT meeting with success', async () => {
        const response = await supertest(server)
            .put('/meeting/1')
            .send({ meetingDate: '2023-10-02', activity: 'update + Pioneiria, Fogos', comments: 'blabla' })

        expect(response.status).toEqual(200)
    })

    test('DELETE meeting with success', async () => {
        const response = await supertest(server)
            .delete('/meeting/1')

        expect(response.status).toEqual(200)
    })
})