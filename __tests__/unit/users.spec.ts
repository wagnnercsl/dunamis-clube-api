import { describe, expect, it } from "@jest/globals";
import UserService from '../../src/services/userService'

describe('User unit tests', () => {
    it('must get all users', async () => {

        // const mockDb = [{
        //     "id": 348,
        //     "firstName": "wag",
        //     "lastName": "wag",
        //     "phone": "5123123",
        //     "role": "nenhum",
        //     "createdAt": "2024-03-02T07:04:19.000Z",
        //     "updatedAt": "2024-03-02T07:04:19.000Z"
        // }];
        const mockDb = new Array();

        const repoUser = {
            findAll: () => mockDb
        };

        const userService = new UserService(repoUser);

        const result = await userService.getAll();

        expect(result).toEqual([])

    })

    it('must get a single user', async () => {

        const mockDb = [{
            "id": 348,
            "firstName": "wag",
            "lastName": "wag",
            "phone": "5123123",
            "role": "nenhum",
            "createdAt": "2024-03-02T07:04:19.000Z",
            "updatedAt": "2024-03-02T07:04:19.000Z"
        }];

        const repoUser = {
            findAll: () => mockDb,
            findOne: () => mockDb[0]
        };

        const userService = new UserService(repoUser);

        const result = await userService.getOne(348);

        expect(result).toEqual(mockDb[0])

    })

    it('must create a user', async () => {
        const randomId = Number.parseInt((Math.random() * 10).toFixed(2));

        const repoUser = {
            create: () => randomId
        };

        const userService = new UserService(repoUser);

        const newUser = {
            firstName: 'Teste',
            lastName: 'te',
            phone: '1233123',
            role: '123123'
        }

        const result = await userService.createUser(newUser);

        expect(result).toEqual(randomId)
    })

    it('must update a user', async () => {
        const userId = Number.parseInt((Math.random() * 10).toFixed(2));

        const repoUser = {
            update: () => userId
        };

        const userService = new UserService(repoUser);

        const newUser = {
            firstName: 'Teste',
            lastName: 'te',
            phone: '1233123',
            role: '123123'
        }

        const result = await userService.updateUser(userId, newUser);

        expect(result).toEqual(userId)
    })

    it('must delete a user', async () => {
        const userId = Number.parseInt((Math.random() * 10).toFixed(2));

        const repoUser = {
            destroy: () => true
        };

        const userService = new UserService(repoUser);

        const result = await userService.deleteUser(userId);

        expect(result).toEqual(true)
    })
})