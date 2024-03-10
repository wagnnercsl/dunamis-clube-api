import { UserModel } from '@models/user';
import { where } from 'sequelize';
import { z } from "zod";

const userSchema = z.object({
    id: z.number().optional(),
    firstName: z.string().nonempty({ message: 'Não pode ser vazio!' }).max(50),
    lastName: z.string().nonempty({ message: 'Não pode ser vazio!' }).max(50),
    phone: z.string().nonempty({ message: 'Não pode ser vazio!' }).max(50),
    role: z.string().nonempty({ message: 'Não pode ser vazio!' }).max(50)
})

type User = z.infer<typeof userSchema>

class UserService {
    model: any;

    constructor(userModel: any) {
        this.model = userModel;
    }

async getAll() {
    try {
        const result = await this.model.findAll() as User[]

        console.log('from class component!')

        return result
    } catch (error) {
        console.log(error)
    }
}

async getOne(userId: Number) {
    try {
        const result = await this.model.findOne({ where: {
            id: userId
        }}) as User

        console.log('from class component!')

        return result
    } catch (error) {
        console.log(error)
    }
}

async createUser(user: User) {
    try {
        const { firstName, lastName, phone, role } = user

        userSchema.parse({ firstName, lastName, phone, role })

        const result = await this.model.create({ firstName, lastName, phone, role })

        console.log("User created! ", result.id)
        console.log(result)
        return result
    } catch (error: any) {
        console.log(error)
    }
}

async updateUser(userId: Number, userInfo: User) {
    try {
        const { firstName, lastName, phone } = userInfo

        const result = await this.model.update({ firstName, lastName }, {
            where: {
                id: userId
            }
        }) as unknown as User

        console.log("User updated! ", result.firstName)

        return result
    } catch (error) {
        console.log(error)
    }
}

async deleteUser(userId: Number) {
    try {
        const result = await this.model.destroy({
            where: {
                id: userId
            }
        }) as unknown as User

        console.log("User deleted! ", result)

        return result
    } catch (error) {
        console.log(error)
    }
}

}

export default UserService;