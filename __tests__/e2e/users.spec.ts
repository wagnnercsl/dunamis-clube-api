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
import { UserModel } from '../../src/models/user'

describe('User E2E tests', () => {

    beforeAll(async () => {
        await supertest(server)
            .post('/user')
            .send({ firstName: 'test', lastName: 'e2e', phone: '51999999', role: 'desbravador' })
    })

    afterAll((done) => {
        Promise.all([
            UserModel.destroy({ where: {} })
        ]).then(() => {
            server.close(done)
        })
    })

    test('Create User with success', async () => {
        const response = await supertest(server)
            .post('/user')
            .send({ firstName: 'test', lastName: 'e2e', phone: '51999999', role: 'desbravador' })

        expect(response.status).toEqual(201)
        expect(response.text).not.toContain('issues')
    })

    test('Create User with fail', async () => {
        const response = await supertest(server)
            .post('/user')
            .send({ firstName: 'test', lastName: 'e2e' })

        expect(response.status).toEqual(500)
        expect(response.text).toContain('issues')
    })

    test('GET All Users with success', async () => {
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