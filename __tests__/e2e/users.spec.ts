import {
    jest,
    describe,
    test,
    expect,
    beforeAll,
    afterAll
} from '@jest/globals'

import supertest from 'supertest'

import server from '../../src/server'

describe('API E2E Tests', () => {

    afterAll((done) => {

        supertest(server)
            .delete('/user')
            .send({})

        server.close(done)
    })

    test('POST Users with success', async () => {
        const response = await supertest(server)
            .post('/user')
            .send({ firstName: 'test', lastName: 'e2e', phone: '51999999', role: 'desbravador' })

        expect(response.status).toEqual(201)
        expect(response.text).not.toContain('issues')
    })

    test('POST Users with fail', async () => {
        const response = await supertest(server)
            .post('/user')
            .send({ firstName: 'test', lastName: 'e2e' })

        expect(response.status).toEqual(500)
        expect(response.text).toContain('issues')
    })

    test('GET Users with success', async () => {
        const response = await supertest(server)
            .get('/user')

        expect(response.status).toEqual(200)
    })

    test('PUT Users with success', async () => {
        const response = await supertest(server)
            .put('/user/1')
            .send({ firstName: 'test updated', lastName: 'e2e' })

        expect(response.status).toEqual(200)
    })

    test('DELETE Users with success', async () => {
        const response = await supertest(server)
            .delete('/user/1')

        expect(response.status).toEqual(200)
    })
})